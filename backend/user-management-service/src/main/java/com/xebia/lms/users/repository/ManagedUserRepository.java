package com.xebia.lms.users.repository;

import com.xebia.lms.users.entity.ManagedUser;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagedUserRepository extends JpaRepository<ManagedUser, UUID> {
    List<ManagedUser> findByTenantId(UUID tenantId);
}
