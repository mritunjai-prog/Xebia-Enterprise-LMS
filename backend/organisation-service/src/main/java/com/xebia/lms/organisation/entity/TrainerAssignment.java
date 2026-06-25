package com.xebia.lms.organisation.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "trainer_assignments", schema = "organisation")
public class TrainerAssignment extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID trainerId;
    @Column(nullable = false)
    private UUID universityId;
    @Column(nullable = false)
    private String subjectCode;

    public UUID getTrainerId() { return trainerId; }
    public void setTrainerId(UUID trainerId) { this.trainerId = trainerId; }
    public UUID getUniversityId() { return universityId; }
    public void setUniversityId(UUID universityId) { this.universityId = universityId; }
    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }
}
