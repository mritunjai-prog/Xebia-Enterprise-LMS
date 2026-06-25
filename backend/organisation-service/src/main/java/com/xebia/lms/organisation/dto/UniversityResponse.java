package com.xebia.lms.organisation.dto;

import com.xebia.lms.organisation.entity.InstitutionType;
import java.util.UUID;

public record UniversityResponse(UUID id, UUID tenantId, String name, InstitutionType type, String officialContactName, String officialContactEmail, String officialContactPhone) {
}
