package com.xebia.lms.notification.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.event.LmsEvent;
import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.notification.adapter.NotificationAdapter;
import com.xebia.lms.notification.dto.NotificationRequest;
import com.xebia.lms.notification.entity.DeliveryAttempt;
import com.xebia.lms.notification.entity.DeliveryStatus;
import com.xebia.lms.notification.entity.NotificationEntity;
import com.xebia.lms.notification.repository.DeliveryAttemptRepository;
import com.xebia.lms.notification.repository.NotificationRepository;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationDispatchService {
    private final NotificationRepository notifications;
    private final DeliveryAttemptRepository attempts;
    private final List<NotificationAdapter> adapters;
    private final PermissionGuard guard;
    public NotificationDispatchService(NotificationRepository notifications, DeliveryAttemptRepository attempts, List<NotificationAdapter> adapters, PermissionGuard guard) {
        this.notifications = notifications; this.attempts = attempts; this.adapters = adapters; this.guard = guard;
    }
    public List<NotificationEntity> list() { guard.requireTenant(); return notifications.findByTenantId(TenantContext.tenantId()); }
    @Transactional public NotificationEntity create(NotificationRequest request) {
        guard.requireTenant();
        return notifications.findBySourceEventId(request.sourceEventId()).orElseGet(() -> {
            NotificationEntity notification = new NotificationEntity();
            notification.setTenantId(TenantContext.tenantId());
            notification.setSourceEventId(request.sourceEventId());
            notification.setRecipient(request.recipient());
            notification.setChannel(request.channel());
            notification.setSubject(request.subject());
            notification.setBody(request.body());
            notification.setAttachmentRef(request.attachmentRef());
            return dispatch(notifications.save(notification));
        });
    }

    @Transactional
    public NotificationEntity createFromEvent(LmsEvent event) {
        Map<String, Object> payload = event.payload();
        String sourceEventId = stringValue(payload, "sourceEventId", event.eventId().toString());
        return notifications.findBySourceEventId(sourceEventId).orElseGet(() -> {
            NotificationEntity notification = new NotificationEntity();
            notification.setTenantId(event.tenantId());
            notification.setSourceEventId(sourceEventId);
            notification.setRecipient(stringValue(payload, "recipient", "admin@lms.local"));
            notification.setChannel(com.xebia.lms.notification.entity.Channel.valueOf(stringValue(payload, "channel", "EMAIL")));
            notification.setSubject(stringValue(payload, "subject", event.eventType()));
            notification.setBody(stringValue(payload, "body", "Notification event " + event.eventType()));
            notification.setAttachmentRef((String) payload.get("attachmentRef"));
            return dispatch(notifications.save(notification));
        });
    }

    @KafkaListener(topics = "lms.notification.requested")
    public void consumeNotificationRequested(LmsEvent event) {
        createFromEvent(event);
    }
    @Transactional public NotificationEntity retry(UUID id) {
        NotificationEntity notification = notifications.findById(id).filter(found -> found.getTenantId().equals(TenantContext.tenantId())).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Notification not found"));
        return dispatch(notification);
    }

    private NotificationEntity dispatch(NotificationEntity notification) {
        NotificationAdapter adapter = adapters.stream().filter(item -> item.supports(notification.getChannel().name())).findFirst().orElseThrow(() -> new BusinessException(HttpStatus.CONFLICT, "No adapter for channel"));
        DeliveryAttempt attempt = new DeliveryAttempt();
        attempt.setNotificationId(notification.getId());
        attempt.setChannel(notification.getChannel());
        attempt.setAttemptNumber((int) attempts.countByNotificationId(notification.getId()) + 1);
        try {
            attempt.setProviderResponse(adapter.send(notification));
            attempt.setStatus(DeliveryStatus.SENT);
            notification.setStatus(DeliveryStatus.SENT);
        } catch (RuntimeException ex) {
            attempt.setProviderResponse(ex.getMessage());
            attempt.setStatus(DeliveryStatus.FAILED);
            attempt.setNextAttemptAt(Instant.now().plusSeconds(backoffSeconds(attempt.getAttemptNumber())));
            notification.setStatus(DeliveryStatus.FAILED);
        }
        attempts.save(attempt);
        return notifications.save(notification);
    }

    private long backoffSeconds(int attemptNumber) {
        int boundedAttempt = Math.min(attemptNumber, 6);
        return (long) Math.pow(2, boundedAttempt) * 30;
    }

    private String stringValue(Map<String, Object> payload, String key, String fallback) {
        Object value = payload.get(key);
        return value == null ? fallback : String.valueOf(value);
    }
}
