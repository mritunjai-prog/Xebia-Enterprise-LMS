package com.xebia.lms.batch.repository;

import com.xebia.lms.batch.entity.Enrolment;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrolmentRepository extends JpaRepository<Enrolment, UUID> {
    List<Enrolment> findByTenantId(UUID tenantId);
}
