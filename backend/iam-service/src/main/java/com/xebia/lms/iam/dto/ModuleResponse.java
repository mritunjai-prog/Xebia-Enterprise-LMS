package com.xebia.lms.iam.dto;

import java.util.UUID;

public record ModuleResponse(UUID id, String code, String displayName, String route) {
}
