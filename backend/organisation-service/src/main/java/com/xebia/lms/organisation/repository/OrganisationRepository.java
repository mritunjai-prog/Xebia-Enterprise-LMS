package com.xebia.lms.organisation.repository;

import com.xebia.lms.organisation.entity.Organisation;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationRepository extends JpaRepository<Organisation, UUID> {
    List<Organisation> findByTenantId(UUID tenantId);
}
