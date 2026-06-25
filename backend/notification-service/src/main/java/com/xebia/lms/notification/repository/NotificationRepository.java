package com.xebia.lms.notification.repository;

import com.xebia.lms.notification.entity.NotificationEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, UUID> {
    List<NotificationEntity> findByTenantId(UUID tenantId);
    Optional<NotificationEntity> findBySourceEventId(String sourceEventId);
}
