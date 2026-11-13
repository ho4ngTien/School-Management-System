package com.edu.people.application.command;

import com.edu.people.domain.model.TeacherStatus;

public record UpdateTeacherCommand(
        String fullName,
        String specialization,
        TeacherStatus status
) {
}

