package com.xebia.lms.course.dto;

import jakarta.validation.constraints.NotBlank;

public record CourseRequest(@NotBlank String title, String description, boolean published) {
}
