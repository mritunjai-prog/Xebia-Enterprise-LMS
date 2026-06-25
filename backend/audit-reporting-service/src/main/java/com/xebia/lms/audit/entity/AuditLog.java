package com.xebia.lms.audit.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "audit_logs", schema = "audit_reporting")
public class AuditLog extends TenantScopedEntity {
    private UUID actorUserId;

    @Column(nullable = false)
    private String actionCode;

    @Column(nullable = false)
    private String resourceType;

    private String resourceId;

    @Column(columnDefinition = "TEXT")
    private String detailJson;

    public UUID getActorUserId() { return actorUserId; }
    public void setActorUserId(UUID actorUserId) { this.actorUserId = actorUserId; }
    public String getActionCode() { return actionCode; }
    public void setActionCode(String actionCode) { this.actionCode = actionCode; }
    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }
    public String getResourceId() { return resourceId; }
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public String getDetailJson() { return detailJson; }
    public void setDetailJson(String detailJson) { this.detailJson = detailJson; }
}
