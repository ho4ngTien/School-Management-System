package com.edu.enrollment.application.command;

public record UpdateLearningGroupCommand(
        String name,
        String description,
        Integer maxMembers
) {
}
