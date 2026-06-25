package com.xebia.lms.approval.service;

import com.xebia.lms.approval.dto.CreateApprovalRequest;
import com.xebia.lms.approval.dto.DecisionRequest;
import com.xebia.lms.approval.dto.PolicyRequest;
import com.xebia.lms.approval.entity.ApprovalPolicy;
import com.xebia.lms.approval.entity.ApprovalRequestEntity;
import com.xebia.lms.approval.entity.ApprovalStatus;
import com.xebia.lms.approval.event.ApprovalEventPublisher;
import com.xebia.lms.approval.repository.ApprovalPolicyRepository;
import com.xebia.lms.approval.repository.ApprovalRequestRepository;
import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApprovalWorkflowService {
    private final ApprovalRequestRepository requests;
    private final ApprovalPolicyRepository policies;
    private final PermissionGuard guard;
    private final ApprovalEventPublisher publisher;
    public ApprovalWorkflowService(ApprovalRequestRepository requests, ApprovalPolicyRepository policies, PermissionGuard guard, ApprovalEventPublisher publisher) {
        this.requests = requests; this.policies = policies; this.guard = guard; this.publisher = publisher;
    }
    public List<ApprovalRequestEntity> listRequests() { guard.requireTenant(); return requests.findByTenantId(TenantContext.tenantId()); }
    public List<ApprovalPolicy> listPolicies() { guard.requireTenant(); return policies.findByTenantId(TenantContext.tenantId()); }
    @Transactional public ApprovalRequestEntity request(CreateApprovalRequest input) {
        guard.requireTenant();
        ApprovalRequestEntity entity = new ApprovalRequestEntity();
        entity.setTenantId(TenantContext.tenantId());
        entity.setRequestedBy(TenantContext.userId());
        entity.setActionCode(input.actionCode());
        entity.setResourceType(input.resourceType());
        entity.setResourceId(input.resourceId());
        entity.setPayloadJson(input.payloadJson());
        ApprovalRequestEntity saved = requests.save(entity);
        publisher.requested(saved);
        return saved;
    }
    @Transactional public ApprovalRequestEntity decide(UUID id, ApprovalStatus status, DecisionRequest decision) {
        ApprovalRequestEntity request = requests.findById(id).filter(found -> found.getTenantId().equals(TenantContext.tenantId())).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Approval request not found"));
        if (request.getStatus() != ApprovalStatus.PENDING) throw new BusinessException(HttpStatus.CONFLICT, "Approval request is already decided");
        request.setStatus(status);
        request.setDecidedBy(TenantContext.userId());
        request.setDecisionReason(decision == null ? null : decision.reason());
        ApprovalRequestEntity saved = requests.save(request);
        publisher.decided(saved);
        return saved;
    }
    @Transactional public ApprovalPolicy policy(PolicyRequest input) {
        guard.requireTenant();
        ApprovalPolicy policy = new ApprovalPolicy();
        policy.setTenantId(TenantContext.tenantId());
        policy.setRoleCode(input.roleCode());
        policy.setActionCode(input.actionCode());
        policy.setResourceType(input.resourceType());
        policy.setApprovalRequired(input.approvalRequired());
        return policies.save(policy);
    }
}
