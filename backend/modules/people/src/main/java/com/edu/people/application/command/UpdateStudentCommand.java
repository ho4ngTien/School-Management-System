package com.edu.people.application.command;

import com.edu.people.domain.model.StudentStatus;

import java.time.Instant;
import java.time.LocalDate;

public record UpdateStudentCommand(
        String fullName,
        LocalDate dateOfBirth,
        Instant enrolledAt,
        StudentStatus status
) {
}

