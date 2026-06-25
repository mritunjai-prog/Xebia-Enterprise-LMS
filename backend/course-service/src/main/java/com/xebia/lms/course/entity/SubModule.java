package com.xebia.lms.course.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "submodules", schema = "course")
public class SubModule extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID moduleId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private int position;
    public UUID getModuleId() { return moduleId; }
    public void setModuleId(UUID moduleId) { this.moduleId = moduleId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
}
