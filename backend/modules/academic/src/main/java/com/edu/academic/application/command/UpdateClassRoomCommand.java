package com.edu.academic.application.command;

import java.util.UUID;

public record UpdateClassRoomCommand(
        String code,
        String name,
        UUID academicYearId,
        Integer capacity
) {
}
