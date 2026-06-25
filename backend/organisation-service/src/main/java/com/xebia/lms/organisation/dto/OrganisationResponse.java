package com.xebia.lms.organisation.dto;

import java.util.UUID;

public record OrganisationResponse(UUID id, UUID tenantId, String name, String officialContactEmail) {
}
