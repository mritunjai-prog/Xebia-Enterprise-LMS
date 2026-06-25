package com.xebia.lms.iam.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record LoginRequest(@NotNull UUID tenantId, @Email @NotBlank String email, @NotBlank String password) {
}
