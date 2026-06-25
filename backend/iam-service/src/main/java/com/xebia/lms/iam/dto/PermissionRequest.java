package com.xebia.lms.iam.dto;

import jakarta.validation.constraints.NotBlank;

public record PermissionRequest(@NotBlank String code, @NotBlank String description) {
}
