package com.xebia.lms.iam.repository;

import com.xebia.lms.iam.entity.PermissionOverride;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionOverrideRepository extends JpaRepository<PermissionOverride, UUID> {
}
