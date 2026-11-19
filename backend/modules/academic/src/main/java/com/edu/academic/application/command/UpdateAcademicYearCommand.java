package com.edu.academic.application.command;

import com.edu.academic.domain.model.AcademicStatus;

import java.time.LocalDate;

public record UpdateAcademicYearCommand(
        String name,
        LocalDate startDate,
        LocalDate endDate,
        AcademicStatus status
) {
}
