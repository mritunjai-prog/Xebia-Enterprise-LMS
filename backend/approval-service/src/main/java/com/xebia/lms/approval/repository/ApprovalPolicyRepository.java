package com.xebia.lms.approval.repository;

import com.xebia.lms.approval.entity.ApprovalPolicy;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalPolicyRepository extends JpaRepository<ApprovalPolicy, UUID> {
    List<ApprovalPolicy> findByTenantId(UUID tenantId);
}
