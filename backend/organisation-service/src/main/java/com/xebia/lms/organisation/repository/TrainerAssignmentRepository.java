package com.xebia.lms.organisation.repository;

import com.xebia.lms.organisation.entity.TrainerAssignment;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerAssignmentRepository extends JpaRepository<TrainerAssignment, UUID> {
    List<TrainerAssignment> findByTenantId(UUID tenantId);
}
