package com.edu.people.application.service;

import com.edu.people.api.dto.StudentView;
import com.edu.people.application.command.CreateStudentCommand;
import com.edu.people.application.command.UpdateStudentCommand;
import com.edu.people.application.port.out.PeopleUserQuery;
import com.edu.people.domain.exception.DuplicateStudentCodeException;
import com.edu.people.domain.exception.InvalidUserException;
import com.edu.people.domain.model.StudentStatus;
import com.edu.people.infrastructure.persistence.entity.StudentEntity;
import com.edu.people.infrastructure.persistence.repository.StudentJpaRepository;
import com.edu.shared.kernel.domain.identifier.OrganizationId;
import com.edu.shared.kernel.domain.identifier.UserId;
import com.edu.shared.kernel.domain.tenant.TenantContext;
import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentJpaRepository studentRepository;

    @Mock
    private PeopleUserQuery peopleUserQuery;

    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentService(studentRepository, peopleUserQuery);
    }

    @AfterEach
    void tearDown() {
        TenantContext.clear();
    }

    @Test
    void createStudent_whenUserNotFoundInIdentity_throwsInvalidUserException() {
        UUID userId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(false);

        CreateStudentCommand command = new CreateStudentCommand(
                userId,
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                UUID.randomUUID(),
                Instant.now()
        );

        assertThatThrownBy(() -> studentService.createStudent(command))
                .isInstanceOf(InvalidUserException.class);
        verify(studentRepository, never()).save(any());
    }

    @Test
    void createStudent_whenCallerIsTeacher_throwsForbidden() {
        UUID userId = UUID.randomUUID();
        UUID orgId = UUID.randomUUID();
        TenantContext.set(new UserId(userId), new OrganizationId(orgId), "TEACHER");

        CreateStudentCommand command = new CreateStudentCommand(
                userId,
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                orgId,
                Instant.now()
        );

        assertThatThrownBy(() -> studentService.createStudent(command))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Teachers are not allowed");
    }

    @Test
    void createStudent_whenCodeAlreadyExists_throwsDuplicateStudentCodeException() {
        UUID userId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(true);
        when(studentRepository.existsByStudentCode("STU001")).thenReturn(true);

        CreateStudentCommand command = new CreateStudentCommand(
                userId,
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                UUID.randomUUID(),
                Instant.now()
        );

        assertThatThrownBy(() -> studentService.createStudent(command))
                .isInstanceOf(DuplicateStudentCodeException.class);
    }

    @Test
    void createStudent_success_savesAndReturnsView() {
        UUID userId = UUID.randomUUID();
        UUID orgId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(true);
        when(studentRepository.existsByStudentCode("STU001")).thenReturn(false);
        when(studentRepository.save(any(StudentEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CreateStudentCommand command = new CreateStudentCommand(
                userId,
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                orgId,
                Instant.now()
        );

        StudentView result = studentService.createStudent(command);

        assertThat(result).isNotNull();
        assertThat(result.studentCode()).isEqualTo("STU001");
        assertThat(result.fullName()).isEqualTo("Nguyen Van A");
        assertThat(result.status()).isEqualTo(StudentStatus.ACTIVE);
        verify(studentRepository).save(any(StudentEntity.class));
    }

    @Test
    void updateStudent_success_updatesFieldsAndReturnsView() {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentEntity existing = new StudentEntity(
                studentId,
                UUID.randomUUID(),
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now()
        );
        when(studentRepository.findByIdAndOrganizationId(studentId, orgId)).thenReturn(Optional.of(existing));
        when(studentRepository.save(any(StudentEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateStudentCommand command = new UpdateStudentCommand(
                "Nguyen Van B Updated",
                LocalDate.of(2005, 5, 20),
                Instant.now(),
                StudentStatus.SUSPENDED
        );

        StudentView result = studentService.updateStudent(orgId, studentId, command);

        assertThat(result.fullName()).isEqualTo("Nguyen Van B Updated");
        assertThat(result.status()).isEqualTo(StudentStatus.SUSPENDED);
        assertThat(result.dateOfBirth()).isEqualTo(LocalDate.of(2005, 5, 20));
        verify(studentRepository).save(existing);
    }

    @Test
    void deactivateStudent_success_setsStatusToInactive() {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentEntity existing = new StudentEntity(
                studentId,
                UUID.randomUUID(),
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now()
        );
        when(studentRepository.findByIdAndOrganizationId(studentId, orgId)).thenReturn(Optional.of(existing));
        when(studentRepository.save(any(StudentEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        StudentView result = studentService.deactivateStudent(orgId, studentId);

        assertThat(result.status()).isEqualTo(StudentStatus.INACTIVE);
        verify(studentRepository).save(existing);
    }

    @Test
    void getStudent_whenNotFound_throwsResourceNotFoundException() {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        when(studentRepository.findByIdAndOrganizationId(studentId, orgId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> studentService.getStudent(orgId, studentId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void listStudentsByOrganization_returnsList() {
        UUID orgId = UUID.randomUUID();
        StudentEntity entity = new StudentEntity(
                UUID.randomUUID(),
                UUID.randomUUID(),
                "STU001",
                "Nguyen Van A",
                LocalDate.of(2005, 1, 1),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now()
        );
        when(studentRepository.findAllByOrganizationId(orgId)).thenReturn(List.of(entity));

        List<StudentView> results = studentService.listStudentsByOrganization(orgId);

        assertThat(results).hasSize(1);
        assertThat(results.get(0).studentCode()).isEqualTo("STU001");
    }
}
