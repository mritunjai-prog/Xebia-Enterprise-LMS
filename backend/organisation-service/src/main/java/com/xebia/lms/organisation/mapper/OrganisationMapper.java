package com.xebia.lms.organisation.mapper;

import com.xebia.lms.organisation.dto.OrganisationResponse;
import com.xebia.lms.organisation.dto.UniversityResponse;
import com.xebia.lms.organisation.entity.Organisation;
import com.xebia.lms.organisation.entity.University;

public class OrganisationMapper {
    private OrganisationMapper() {}

    public static UniversityResponse university(University university) {
        return new UniversityResponse(
                university.getId(),
                university.getTenantId(),
                university.getName(),
                university.getType(),
                university.getOfficialContactName(),
                university.getOfficialContactEmail(),
                university.getOfficialContactPhone()
        );
    }

    public static OrganisationResponse organisation(Organisation organisation) {
        return new OrganisationResponse(
                organisation.getId(),
                organisation.getTenantId(),
                organisation.getName(),
                organisation.getOfficialContactEmail()
        );
    }
}
