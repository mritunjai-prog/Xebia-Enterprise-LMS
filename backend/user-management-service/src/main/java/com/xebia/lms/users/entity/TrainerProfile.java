package com.xebia.lms.users.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "trainer_profiles", schema = "user_management")
public class TrainerProfile extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID managedUserId;
    private String primarySubject;
    public UUID getManagedUserId() { return managedUserId; }
    public void setManagedUserId(UUID managedUserId) { this.managedUserId = managedUserId; }
    public String getPrimarySubject() { return primarySubject; }
    public void setPrimarySubject(String primarySubject) { this.primarySubject = primarySubject; }
}
