package com.xebia.lms.organisation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TrainerAssignmentRequest(@NotNull UUID trainerId, @NotNull UUID universityId, @NotBlank String subjectCode) {
}
