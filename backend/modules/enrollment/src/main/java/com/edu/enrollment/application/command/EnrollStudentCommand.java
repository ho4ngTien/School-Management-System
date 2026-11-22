package com.edu.enrollment.application.command;

import java.time.Instant;
import java.util.UUID;

public record EnrollStudentCommand(
        UUID studentId,
        UUID subjectId,
        UUID classRoomId,
        UUID semesterId,
        UUID organizationId,
        Instant enrolledAt
) {
}
