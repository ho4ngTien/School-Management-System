package com.edu.enrollment.infrastructure.web;

import com.edu.enrollment.api.dto.CreateEnrollmentRequest;
import com.edu.enrollment.api.dto.EnrollmentView;
import com.edu.enrollment.application.command.EnrollStudentCommand;
import com.edu.enrollment.application.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/organizations/{organizationId}")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<EnrollmentView>> list(
            @PathVariable UUID organizationId,
            @RequestParam(required = false) UUID studentId,
            @RequestParam(required = false) UUID semesterId
    ) {
        return ResponseEntity.ok(enrollmentService.list(organizationId, studentId, semesterId));
    }

    @PostMapping("/enrollments")
    public ResponseEntity<EnrollmentView> create(
            @PathVariable UUID organizationId,
            @Valid @RequestBody CreateEnrollmentRequest request
    ) {
        EnrollStudentCommand command = new EnrollStudentCommand(
                request.studentId(),
                request.subjectId(),
                request.classRoomId(),
                request.semesterId(),
                organizationId,
                request.enrolledAt()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentService.enroll(command));
    }

    @GetMapping("/enrollments/{id}")
    public ResponseEntity<EnrollmentView> getById(
            @PathVariable UUID organizationId,
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(enrollmentService.getById(organizationId, id));
    }

    @PostMapping("/enrollments/{id}/withdraw")
    public ResponseEntity<EnrollmentView> withdraw(
            @PathVariable UUID organizationId,
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(enrollmentService.withdraw(organizationId, id));
    }

    @PostMapping("/enrollments/{id}/complete")
    public ResponseEntity<EnrollmentView> complete(
            @PathVariable UUID organizationId,
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(enrollmentService.complete(organizationId, id));
    }

    @GetMapping("/students/{studentId}/enrollments")
    public ResponseEntity<List<EnrollmentView>> listByStudent(
            @PathVariable UUID organizationId,
            @PathVariable UUID studentId
    ) {
        return ResponseEntity.ok(enrollmentService.listByStudent(organizationId, studentId));
    }
}
