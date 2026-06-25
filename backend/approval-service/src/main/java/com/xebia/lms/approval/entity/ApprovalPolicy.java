package com.xebia.lms.approval.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "approval_policies", schema = "approval")
public class ApprovalPolicy extends TenantScopedEntity {
    @Column(nullable = false)
    private String roleCode;
    @Column(nullable = false)
    private String actionCode;
    @Column(nullable = false)
    private String resourceType;
    @Column(nullable = false)
    private boolean approvalRequired = true;
    public String getRoleCode() { return roleCode; }
    public void setRoleCode(String roleCode) { this.roleCode = roleCode; }
    public String getActionCode() { return actionCode; }
    public void setActionCode(String actionCode) { this.actionCode = actionCode; }
    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }
    public boolean isApprovalRequired() { return approvalRequired; }
    public void setApprovalRequired(boolean approvalRequired) { this.approvalRequired = approvalRequired; }
}
