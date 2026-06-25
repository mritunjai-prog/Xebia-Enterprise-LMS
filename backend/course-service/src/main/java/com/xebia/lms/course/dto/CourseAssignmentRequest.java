package com.xebia.lms.course.dto;

import java.util.UUID;

public record CourseAssignmentRequest(UUID batchId, UUID studentId) {
}
