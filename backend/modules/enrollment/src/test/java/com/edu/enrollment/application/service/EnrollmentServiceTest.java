package com.edu.enrollment.application.service;

import com.edu.academic.infrastructure.persistence.entity.ClassRoomEntity;
import com.edu.academic.infrastructure.persistence.entity.SemesterEntity;
import com.edu.academic.infrastructure.persistence.repository.ClassRoomJpaRepository;
import com.edu.academic.infrastructure.persistence.repository.SemesterJpaRepository;
import com.edu.curriculum.domain.model.SubjectStatus;
import com.edu.curriculum.infrastructure.persistence.entity.SubjectEntity;
import com.edu.curriculum.infrastructure.persistence.repository.SubjectJpaRepository;
import com.edu.enrollment.application.command.EnrollStudentCommand;
import com.edu.enrollment.domain.exception.DuplicateEnrollmentException;
import com.edu.enrollment.domain.exception.InvalidEnrollmentStateException;
import com.edu.enrollment.domain.model.EnrollmentStatus;
import com.edu.enrollment.infrastructure.persistence.entity.EnrollmentEntity;
import com.edu.enrollment.infrastructure.persistence.repository.EnrollmentJpaRepository;
import com.edu.people.domain.model.StudentStatus;
import com.edu.people.infrastructure.persistence.entity.StudentEntity;
import com.edu.people.infrastructure.persistence.repository.StudentJpaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EnrollmentServiceTest {

    @Mock private EnrollmentJpaRepository enrollmentRepository;
    @Mock private StudentJpaRepository studentRepository;
    @Mock private SubjectJpaRepository subjectRepository;
    @Mock private ClassRoomJpaRepository classRoomRepository;
    @Mock private SemesterJpaRepository semesterRepository;

    private EnrollmentService service;

    @BeforeEach
    void setUp() {
        service = new EnrollmentService(
                enrollmentRepository,
                studentRepository,
                subjectRepository,
                classRoomRepository,
                semesterRepository
        );
    }

    @Test
    void enroll_whenDuplicate_throwsConflict() {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        UUID subjectId = UUID.randomUUID();
        UUID classRoomId = UUID.randomUUID();
        UUID semesterId = UUID.randomUUID();
        mockValidReferences(orgId, studentId, subjectId, classRoomId, semesterId, 35);
        when(enrollmentRepository.existsByStudentIdAndSubjectIdAndSemesterId(
                studentId, subjectId, semesterId)).thenReturn(true);

        EnrollStudentCommand command = new EnrollStudentCommand(
                studentId, subjectId, classRoomId, semesterId, orgId, null);

        assertThatThrownBy(() -> service.enroll(command))
                .isInstanceOf(DuplicateEnrollmentException.class);
    }

    @Test
    void enroll_whenCapacityReached_throwsUnprocessableEntity() {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        UUID subjectId = UUID.randomUUID();
        UUID classRoomId = UUID.randomUUID();
        UUID semesterId = UUID.randomUUID();
        mockValidReferences(orgId, studentId, subjectId, classRoomId, semesterId, 1);
        when(enrollmentRepository.countByClassRoomIdAndStatus(
                classRoomId, EnrollmentStatus.ENROLLED)).thenReturn(1L);

        EnrollStudentCommand command = new EnrollStudentCommand(
                studentId, subjectId, classRoomId, semesterId, orgId, null);

        assertThatThrownBy(() -> service.enroll(command))
                .isInstanceOf(InvalidEnrollmentStateException.class);
    }

    @Test
    void withdraw_whenCompleted_throwsUnprocessableEntity() {
        UUID orgId = UUID.randomUUID();
        UUID enrollmentId = UUID.randomUUID();
        EnrollmentEntity entity = new EnrollmentEntity(
                enrollmentId, UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(),
                UUID.randomUUID(), orgId, Instant.now());
        entity.complete(Instant.now());
        when(enrollmentRepository.findByIdAndOrganizationId(enrollmentId, orgId))
                .thenReturn(Optional.of(entity));

        assertThatThrownBy(() -> service.withdraw(orgId, enrollmentId))
                .isInstanceOf(InvalidEnrollmentStateException.class);
    }

    @Test
    void withdraw_success_setsWithdrawnStatusAndTimestamp() {
        UUID orgId = UUID.randomUUID();
        UUID enrollmentId = UUID.randomUUID();
        EnrollmentEntity entity = new EnrollmentEntity(
                enrollmentId, UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(),
                UUID.randomUUID(), orgId, Instant.now());
        when(enrollmentRepository.findByIdAndOrganizationId(enrollmentId, orgId))
                .thenReturn(Optional.of(entity));
        when(enrollmentRepository.save(any(EnrollmentEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        var view = service.withdraw(orgId, enrollmentId);

        assertThat(view.status()).isEqualTo(EnrollmentStatus.WITHDRAWN);
        assertThat(view.withdrawnAt()).isNotNull();
        verify(enrollmentRepository).save(entity);
    }

    private void mockValidReferences(
            UUID orgId,
            UUID studentId,
            UUID subjectId,
            UUID classRoomId,
            UUID semesterId,
            Integer capacity
    ) {
        StudentEntity student = new StudentEntity(
                studentId, UUID.randomUUID(), "SV001", "Student", LocalDate.now(),
                orgId, StudentStatus.ACTIVE, Instant.now());
        SubjectEntity subject = new SubjectEntity(
                subjectId, "SUB001", "Subject", null, 3, orgId, SubjectStatus.ACTIVE);
        ClassRoomEntity classRoom = new ClassRoomEntity(
                classRoomId, "12A1", "Class", orgId, UUID.randomUUID(), capacity);
        SemesterEntity semester = new SemesterEntity(
                semesterId, UUID.randomUUID(), "Semester 1",
                LocalDate.now(), LocalDate.now().plusMonths(4), orgId);

        when(studentRepository.findByIdAndOrganizationId(studentId, orgId))
                .thenReturn(Optional.of(student));
        when(subjectRepository.findByIdAndOrganizationId(subjectId, orgId))
                .thenReturn(Optional.of(subject));
        when(classRoomRepository.findByIdAndOrganizationId(classRoomId, orgId))
                .thenReturn(Optional.of(classRoom));
        lenient().when(semesterRepository.findByIdAndOrganizationId(semesterId, orgId))
                .thenReturn(Optional.of(semester));
    }
}
