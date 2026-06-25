package com.xebia.lms.iam.dto;

import java.util.List;
import java.util.UUID;

public record LoginResponse(String accessToken, UUID userId, UUID tenantId, String email, List<String> roles) {
}
