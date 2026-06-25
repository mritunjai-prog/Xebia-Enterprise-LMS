package com.xebia.lms.course.repository;

import com.xebia.lms.course.entity.CourseModule;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseModuleRepository extends JpaRepository<CourseModule, UUID> {
}
