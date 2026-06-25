package com.xebia.lms.organisation.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "organisations", schema = "organisation")
public class Organisation extends TenantScopedEntity {
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String officialContactEmail;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getOfficialContactEmail() { return officialContactEmail; }
    public void setOfficialContactEmail(String officialContactEmail) { this.officialContactEmail = officialContactEmail; }
}
