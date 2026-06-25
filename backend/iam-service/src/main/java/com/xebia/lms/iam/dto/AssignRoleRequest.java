package com.xebia.lms.iam.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record AssignRoleRequest(@NotNull UUID roleId, UUID scopeId) {
}
