package com.xebia.lms.iam.entity;

import com.xebia.lms.common.domain.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "role_modules", schema = "iam")
public class RoleModule extends BaseEntity {
    @Column(nullable = false)
    private UUID roleId;

    @Column(nullable = false)
    private UUID moduleId;

    public UUID getRoleId() {
        return roleId;
    }

    public void setRoleId(UUID roleId) {
        this.roleId = roleId;
    }

    public UUID getModuleId() {
        return moduleId;
    }

    public void setModuleId(UUID moduleId) {
        this.moduleId = moduleId;
    }
}
