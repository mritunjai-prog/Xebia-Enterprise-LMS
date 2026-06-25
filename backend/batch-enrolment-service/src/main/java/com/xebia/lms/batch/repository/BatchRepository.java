package com.xebia.lms.batch.repository;

import com.xebia.lms.batch.entity.BatchEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<BatchEntity, UUID> {
    List<BatchEntity> findByTenantId(UUID tenantId);
}
