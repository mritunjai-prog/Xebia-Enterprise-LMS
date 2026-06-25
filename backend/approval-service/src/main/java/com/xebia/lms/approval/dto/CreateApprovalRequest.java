package com.xebia.lms.approval.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateApprovalRequest(@NotBlank String actionCode, @NotBlank String resourceType, @NotBlank String resourceId, String payloadJson) {
}
