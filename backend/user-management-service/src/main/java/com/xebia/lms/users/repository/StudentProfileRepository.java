package com.xebia.lms.users.repository;

import com.xebia.lms.users.entity.StudentProfile;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, UUID> {
}
