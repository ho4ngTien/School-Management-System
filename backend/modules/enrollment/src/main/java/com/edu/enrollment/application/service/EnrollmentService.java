package com.edu.enrollment.application.service;

import com.edu.academic.infrastructure.persistence.repository.ClassRoomJpaRepository;
import com.edu.academic.infrastructure.persistence.repository.SemesterJpaRepository;
import com.edu.curriculum.infrastructure.persistence.repository.SubjectJpaRepository;
import com.edu.enrollment.api.dto.EnrollmentView;
import com.edu.enrollment.application.command.EnrollStudentCommand;
import com.edu.enrollment.domain.exception.DuplicateEnrollmentException;
import com.edu.enrollment.domain.exception.InvalidEnrollmentStateException;
import com.edu.enrollment.domain.model.EnrollmentStatus;
import com.edu.enrollment.infrastructure.persistence.entity.EnrollmentEntity;
import com.edu.enrollment.infrastructure.persistence.repository.EnrollmentJpaRepository;
import com.edu.people.infrastructure.persistence.repository.StudentJpaRepository;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EnrollmentService {

    private final EnrollmentJpaRepository enrollmentRepository;
    private final StudentJpaRepository studentRepository;
    private final SubjectJpaRepository subjectRepository;
    private final ClassRoomJpaRepository classRoomRepository;
    private final SemesterJpaRepository semesterRepository;

    public EnrollmentService(
            EnrollmentJpaRepository enrollmentRepository,
            StudentJpaRepository studentRepository,
            SubjectJpaRepository subjectRepository,
            ClassRoomJpaRepository classRoomRepository,
            SemesterJpaRepository semesterRepository
    ) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.classRoomRepository = classRoomRepository;
        this.semesterRepository = semesterRepository;
    }

    public EnrollmentView enroll(EnrollStudentCommand command) {
        studentRepository.findByIdAndOrganizationId(command.studentId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("Student", command.studentId().toString()));
        subjectRepository.findByIdAndOrganizationId(command.subjectId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject", command.subjectId().toString()));
        classRoomRepository.findByIdAndOrganizationId(command.classRoomId(), command.organizationId())
                .ifPresentOrElse(classRoom -> {
                    if (classRoom.getCapacity() != null
                            && enrollmentRepository.countByClassRoomIdAndStatus(
                                    command.classRoomId(), EnrollmentStatus.ENROLLED) >= classRoom.getCapacity()) {
                        throw new InvalidEnrollmentStateException("Class room capacity has been reached");
                    }
                }, () -> {
                    throw new ResourceNotFoundException("ClassRoom", command.classRoomId().toString());
                });
        semesterRepository.findByIdAndOrganizationId(command.semesterId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("Semester", command.semesterId().toString()));

        if (enrollmentRepository.existsByStudentIdAndSubjectIdAndSemesterId(
                command.studentId(), command.subjectId(), command.semesterId())) {
            throw new DuplicateEnrollmentException();
        }

        Instant enrolledAt = command.enrolledAt() != null ? command.enrolledAt() : Instant.now();
        EnrollmentEntity entity = new EnrollmentEntity(
                UUID.randomUUID(),
                command.studentId(),
                command.subjectId(),
                command.classRoomId(),
                command.semesterId(),
                command.organizationId(),
                enrolledAt
        );
        return toView(enrollmentRepository.save(entity));
    }

    @Transactional(readOnly = true)
    public List<EnrollmentView> list(UUID organizationId, UUID studentId, UUID semesterId) {
        List<EnrollmentEntity> entities;
        if (studentId != null && semesterId != null) {
            entities = enrollmentRepository.findAllByOrganizationIdAndStudentIdAndSemesterId(
                    organizationId, studentId, semesterId);
        } else if (studentId != null) {
            entities = enrollmentRepository.findAllByOrganizationIdAndStudentId(organizationId, studentId);
        } else if (semesterId != null) {
            entities = enrollmentRepository.findAllByOrganizationIdAndSemesterId(organizationId, semesterId);
        } else {
            entities = enrollmentRepository.findAllByOrganizationId(organizationId);
        }
        return entities.stream().map(this::toView).toList();
    }

    @Transactional(readOnly = true)
    public EnrollmentView getById(UUID organizationId, UUID enrollmentId) {
        return enrollmentRepository.findByIdAndOrganizationId(enrollmentId, organizationId)
                .map(this::toView)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", enrollmentId.toString()));
    }

    @Transactional(readOnly = true)
    public List<EnrollmentView> listByStudent(UUID organizationId, UUID studentId) {
        studentRepository.findByIdAndOrganizationId(studentId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", studentId.toString()));
        return enrollmentRepository.findAllByOrganizationIdAndStudentId(organizationId, studentId)
                .stream().map(this::toView).toList();
    }

    public EnrollmentView withdraw(UUID organizationId, UUID enrollmentId) {
        EnrollmentEntity entity = enrollmentRepository.findByIdAndOrganizationId(enrollmentId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", enrollmentId.toString()));
        if (entity.getStatus() == EnrollmentStatus.COMPLETED) {
            throw new InvalidEnrollmentStateException("Completed enrollments cannot be withdrawn");
        }
        if (entity.getStatus() == EnrollmentStatus.WITHDRAWN) {
            throw new InvalidEnrollmentStateException("Enrollment has already been withdrawn");
        }
        entity.withdraw(Instant.now());
        return toView(enrollmentRepository.save(entity));
    }

    public EnrollmentView complete(UUID organizationId, UUID enrollmentId) {
        EnrollmentEntity entity = enrollmentRepository.findByIdAndOrganizationId(enrollmentId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", enrollmentId.toString()));
        if (entity.getStatus() == EnrollmentStatus.WITHDRAWN) {
            throw new InvalidEnrollmentStateException("Withdrawn enrollments cannot be completed");
        }
        if (entity.getStatus() == EnrollmentStatus.COMPLETED) {
            throw new InvalidEnrollmentStateException("Enrollment has already been completed");
        }
        entity.complete(Instant.now());
        return toView(enrollmentRepository.save(entity));
    }

    private EnrollmentView toView(EnrollmentEntity entity) {
        return new EnrollmentView(
                entity.getId(),
                entity.getStudentId(),
                entity.getSubjectId(),
                entity.getClassRoomId(),
                entity.getSemesterId(),
                entity.getOrganizationId(),
                entity.getStatus(),
                entity.getEnrolledAt(),
                entity.getWithdrawnAt(),
                entity.getCompletedAt(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
