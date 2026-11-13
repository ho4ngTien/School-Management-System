package com.edu.people.api.dto;

import com.edu.people.domain.model.TeacherStatus;
import jakarta.validation.constraints.NotBlank;

public record UpdateTeacherRequest(
        @NotBlank(message = "Full name must not be blank")
        String fullName,

        String specialization,

        TeacherStatus status
) {
}

