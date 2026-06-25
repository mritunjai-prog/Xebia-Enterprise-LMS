package com.xebia.lms.batch.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "enrolments", schema = "batch_enrolment")
public class Enrolment extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID studentId;
    private UUID batchId;
    private UUID courseId;
    @Column(nullable = false)
    private String status = "ACTIVE";
    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }
    public UUID getBatchId() { return batchId; }
    public void setBatchId(UUID batchId) { this.batchId = batchId; }
    public UUID getCourseId() { return courseId; }
    public void setCourseId(UUID courseId) { this.courseId = courseId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
