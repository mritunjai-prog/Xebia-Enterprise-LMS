package com.xebia.lms.organisation.repository;

import com.xebia.lms.organisation.entity.University;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, UUID> {
    List<University> findByTenantId(UUID tenantId);
}
