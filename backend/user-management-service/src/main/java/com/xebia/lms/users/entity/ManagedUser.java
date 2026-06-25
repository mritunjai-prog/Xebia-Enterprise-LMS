package com.xebia.lms.users.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "managed_users", schema = "user_management")
public class ManagedUser extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID iamUserId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String fullName;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;
    @Column(nullable = false)
    private boolean active = true;

    public UUID getIamUserId() { return iamUserId; }
    public void setIamUserId(UUID iamUserId) { this.iamUserId = iamUserId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
