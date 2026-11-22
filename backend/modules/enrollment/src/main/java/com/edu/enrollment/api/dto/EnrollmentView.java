package com.edu.enrollment.api.dto;

import com.edu.enrollment.domain.model.EnrollmentStatus;

import java.time.Instant;
import java.util.UUID;

public record EnrollmentView(
        UUID id,
        UUID studentId,
        UUID subjectId,
        UUID classRoomId,
        UUID semesterId,
        UUID organizationId,
        EnrollmentStatus status,
        Instant enrolledAt,
        Instant withdrawnAt,
        Instant completedAt,
        Instant createdAt,
        Instant updatedAt
) {
}
