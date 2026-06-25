package com.xebia.lms.approval.event;

import com.xebia.lms.approval.entity.ApprovalRequestEntity;
import com.xebia.lms.common.event.LmsEvent;
import java.util.Map;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class ApprovalEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;
    public ApprovalEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) { this.kafkaTemplate = kafkaTemplate; }
    public void requested(ApprovalRequestEntity request) {
        kafkaTemplate.send("lms.approval.requested", request.getId().toString(), LmsEvent.of("APPROVAL_REQUESTED", request.getTenantId(), request.getRequestedBy(), "approval-service", Map.of("approvalRequestId", request.getId().toString(), "actionCode", request.getActionCode())));
    }
    public void decided(ApprovalRequestEntity request) {
        kafkaTemplate.send("lms.approval.decided", request.getId().toString(), LmsEvent.of("APPROVAL_DECIDED", request.getTenantId(), request.getDecidedBy(), "approval-service", Map.of("approvalRequestId", request.getId().toString(), "status", request.getStatus().name())));
    }
}
