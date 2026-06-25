package com.xebia.lms.organisation.dto;

import com.xebia.lms.organisation.entity.InstitutionType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UniversityRequest(
        @NotBlank String name,
        InstitutionType type,
        @NotBlank String officialContactName,
        @Email @NotBlank String officialContactEmail,
        String officialContactPhone
) {
}
