package com.xebia.lms.course.repository;

import com.xebia.lms.course.entity.CourseAssignment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, UUID> {
}
