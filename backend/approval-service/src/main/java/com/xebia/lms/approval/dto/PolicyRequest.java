package com.xebia.lms.approval.dto;

import jakarta.validation.constraints.NotBlank;

public record PolicyRequest(@NotBlank String roleCode, @NotBlank String actionCode, @NotBlank String resourceType, boolean approvalRequired) {
}
