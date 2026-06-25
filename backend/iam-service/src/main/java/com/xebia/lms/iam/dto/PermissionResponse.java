package com.xebia.lms.iam.dto;

import java.util.UUID;

public record PermissionResponse(UUID id, String code, String description) {
}
