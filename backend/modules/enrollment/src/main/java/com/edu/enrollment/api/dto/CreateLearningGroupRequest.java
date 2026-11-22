package com.edu.enrollment.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record CreateLearningGroupRequest(
        @NotBlank @Size(max = 100) String name,
        @Size(max = 5000) String description,
        @Positive Integer maxMembers
) {
}
