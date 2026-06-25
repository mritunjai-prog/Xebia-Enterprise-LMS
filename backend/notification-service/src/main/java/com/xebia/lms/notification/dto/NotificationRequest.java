package com.xebia.lms.notification.dto;

import com.xebia.lms.notification.entity.Channel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NotificationRequest(@NotBlank String sourceEventId, @NotBlank String recipient, @NotNull Channel channel, @NotBlank String subject, @NotBlank String body, String attachmentRef) {
}
