package com.xebia.lms.users.repository;

import com.xebia.lms.users.entity.TrainerProfile;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerProfileRepository extends JpaRepository<TrainerProfile, UUID> {
}
