package com.xebia.lms.batch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;

public record BatchRequest(@NotNull UUID universityId, @NotBlank String name, OffsetDateTime startsAt, OffsetDateTime endsAt, String scheduleText) {
}
