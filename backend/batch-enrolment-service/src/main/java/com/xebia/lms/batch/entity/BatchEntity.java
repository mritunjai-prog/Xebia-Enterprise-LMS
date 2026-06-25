package com.xebia.lms.batch.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "batches", schema = "batch_enrolment")
public class BatchEntity extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID universityId;
    @Column(nullable = false)
    private String name;
    private OffsetDateTime startsAt;
    private OffsetDateTime endsAt;
    private String scheduleText;
    public UUID getUniversityId() { return universityId; }
    public void setUniversityId(UUID universityId) { this.universityId = universityId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public OffsetDateTime getStartsAt() { return startsAt; }
    public void setStartsAt(OffsetDateTime startsAt) { this.startsAt = startsAt; }
    public OffsetDateTime getEndsAt() { return endsAt; }
    public void setEndsAt(OffsetDateTime endsAt) { this.endsAt = endsAt; }
    public String getScheduleText() { return scheduleText; }
    public void setScheduleText(String scheduleText) { this.scheduleText = scheduleText; }
}
