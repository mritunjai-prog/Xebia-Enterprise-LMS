package com.xebia.lms.users.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "student_profiles", schema = "user_management")
public class StudentProfile extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID managedUserId;
    private UUID universityId;
    public UUID getManagedUserId() { return managedUserId; }
    public void setManagedUserId(UUID managedUserId) { this.managedUserId = managedUserId; }
    public UUID getUniversityId() { return universityId; }
    public void setUniversityId(UUID universityId) { this.universityId = universityId; }
}
