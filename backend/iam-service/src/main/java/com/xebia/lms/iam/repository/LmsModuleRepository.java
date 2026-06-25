package com.xebia.lms.iam.repository;

import com.xebia.lms.iam.entity.LmsModule;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LmsModuleRepository extends JpaRepository<LmsModule, UUID> {
    Optional<LmsModule> findByCode(String code);
}
