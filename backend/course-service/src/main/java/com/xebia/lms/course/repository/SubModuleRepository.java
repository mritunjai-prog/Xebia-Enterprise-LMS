package com.xebia.lms.course.repository;

import com.xebia.lms.course.entity.SubModule;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubModuleRepository extends JpaRepository<SubModule, UUID> {
}
