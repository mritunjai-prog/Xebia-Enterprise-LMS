package com.xebia.lms.users.dto;

import com.xebia.lms.users.entity.UserType;
import java.util.UUID;

public record UserResponse(UUID id, UUID tenantId, UUID iamUserId, String email, String fullName, UserType userType, boolean active) {
}
