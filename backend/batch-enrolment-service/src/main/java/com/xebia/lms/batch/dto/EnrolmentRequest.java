package com.xebia.lms.batch.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record EnrolmentRequest(@NotNull UUID studentId, UUID batchId, UUID courseId) {
}
