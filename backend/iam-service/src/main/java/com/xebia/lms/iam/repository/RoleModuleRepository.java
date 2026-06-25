package com.xebia.lms.iam.repository;

import com.xebia.lms.iam.entity.RoleModule;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleModuleRepository extends JpaRepository<RoleModule, UUID> {
    List<RoleModule> findByRoleId(UUID roleId);
}
