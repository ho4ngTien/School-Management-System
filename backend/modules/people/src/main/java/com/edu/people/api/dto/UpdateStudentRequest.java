package com.edu.people.api.dto;

import com.edu.people.domain.model.StudentStatus;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.time.LocalDate;

public record UpdateStudentRequest(
        @NotBlank(message = "Full name must not be blank")
        String fullName,

        LocalDate dateOfBirth,

        Instant enrolledAt,

        StudentStatus status
) {
}

