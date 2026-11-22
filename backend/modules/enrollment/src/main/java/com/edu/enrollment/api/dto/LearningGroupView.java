package com.edu.enrollment.api.dto;

import java.time.Instant;
import java.util.UUID;

public record LearningGroupView(
        UUID id,
        UUID classRoomId,
        String name,
        String description,
        UUID organizationId,
        Integer maxMembers,
        Instant createdAt,
        Instant updatedAt
) {
}
