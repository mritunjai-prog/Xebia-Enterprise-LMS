package com.xebia.lms.organisation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OrganisationRequest(@NotBlank String name, @Email @NotBlank String officialContactEmail) {
}
