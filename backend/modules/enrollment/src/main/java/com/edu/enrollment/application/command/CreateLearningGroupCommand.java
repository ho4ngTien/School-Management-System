package com.edu.enrollment.application.command;

import java.util.UUID;

public record CreateLearningGroupCommand(
        UUID classRoomId,
        String name,
        String description,
        UUID organizationId,
        Integer maxMembers
) {
}
