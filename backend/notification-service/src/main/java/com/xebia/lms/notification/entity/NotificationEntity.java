package com.xebia.lms.notification.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications", schema = "notification")
public class NotificationEntity extends TenantScopedEntity {
    @Column(nullable = false, unique = true)
    private String sourceEventId;
    @Column(nullable = false)
    private String recipient;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Channel channel;
    @Column(nullable = false)
    private String subject;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;
    private String attachmentRef;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status = DeliveryStatus.PENDING;
    public String getSourceEventId() { return sourceEventId; }
    public void setSourceEventId(String sourceEventId) { this.sourceEventId = sourceEventId; }
    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }
    public Channel getChannel() { return channel; }
    public void setChannel(Channel channel) { this.channel = channel; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public String getAttachmentRef() { return attachmentRef; }
    public void setAttachmentRef(String attachmentRef) { this.attachmentRef = attachmentRef; }
    public DeliveryStatus getStatus() { return status; }
    public void setStatus(DeliveryStatus status) { this.status = status; }
}
