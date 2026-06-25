package com.xebia.lms.iam.dto;

import jakarta.validation.constraints.NotBlank;

public record RoleRequest(@NotBlank String code, @NotBlank String name) {
}
