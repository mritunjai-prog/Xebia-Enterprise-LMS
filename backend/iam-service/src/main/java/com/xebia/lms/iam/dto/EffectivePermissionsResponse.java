package com.xebia.lms.iam.dto;

import java.io.Serializable;
import java.util.List;

public record EffectivePermissionsResponse(List<String> permissions, List<String> modules) implements Serializable {
}
