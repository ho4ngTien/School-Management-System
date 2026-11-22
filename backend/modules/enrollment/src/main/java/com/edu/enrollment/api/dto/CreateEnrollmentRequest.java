package com.edu.enrollment.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.UUID;

public record CreateEnrollmentRequest(
        @NotNull UUID studentId,
        @NotNull UUID subjectId,
        @NotNull UUID classRoomId,
        @NotNull UUID semesterId,
        Instant enrolledAt
) {
}
