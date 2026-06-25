package com.xebia.lms.users.dto;

import com.xebia.lms.users.entity.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record CreateUserRequest(@NotNull UUID iamUserId, @Email @NotBlank String email, @NotBlank String fullName, @NotNull UserType userType, String primarySubject, UUID universityId) {
}
