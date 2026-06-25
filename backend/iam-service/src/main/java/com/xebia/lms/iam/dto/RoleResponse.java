package com.xebia.lms.iam.dto;

import java.util.UUID;

public record RoleResponse(UUID id, String code, String name, boolean systemRole, boolean active) {
}
