package com.xebia.lms.notification.repository;

import com.xebia.lms.notification.entity.DeliveryAttempt;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryAttemptRepository extends JpaRepository<DeliveryAttempt, UUID> {
    long countByNotificationId(UUID notificationId);
}
