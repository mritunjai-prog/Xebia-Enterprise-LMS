package com.xebia.lms.organisation.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "universities", schema = "organisation")
public class University extends TenantScopedEntity {
    @Column(nullable = false)
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InstitutionType type = InstitutionType.UNIVERSITY;
    @Column(nullable = false)
    private String officialContactName;
    @Column(nullable = false)
    private String officialContactEmail;
    private String officialContactPhone;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public InstitutionType getType() { return type; }
    public void setType(InstitutionType type) { this.type = type; }
    public String getOfficialContactName() { return officialContactName; }
    public void setOfficialContactName(String officialContactName) { this.officialContactName = officialContactName; }
    public String getOfficialContactEmail() { return officialContactEmail; }
    public void setOfficialContactEmail(String officialContactEmail) { this.officialContactEmail = officialContactEmail; }
    public String getOfficialContactPhone() { return officialContactPhone; }
    public void setOfficialContactPhone(String officialContactPhone) { this.officialContactPhone = officialContactPhone; }
}
