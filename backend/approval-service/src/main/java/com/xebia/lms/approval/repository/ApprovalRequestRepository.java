package com.xebia.lms.approval.repository;

import com.xebia.lms.approval.entity.ApprovalRequestEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRequestRepository extends JpaRepository<ApprovalRequestEntity, UUID> {
    List<ApprovalRequestEntity> findByTenantId(UUID tenantId);
}
