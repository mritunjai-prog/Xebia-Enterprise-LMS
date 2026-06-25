package com.xebia.lms.organisation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OfficialContactRequest(@NotBlank String officialContactName, @Email @NotBlank String officialContactEmail, String officialContactPhone) {
}
