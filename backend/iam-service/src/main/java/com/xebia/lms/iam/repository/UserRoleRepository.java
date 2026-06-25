package com.xebia.lms.iam.repository;

import com.xebia.lms.iam.entity.UserRole;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
    List<UserRole> findByUserIdAndTenantId(UUID userId, UUID tenantId);
}
