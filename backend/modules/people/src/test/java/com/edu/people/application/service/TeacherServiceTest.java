package com.edu.people.application.service;

import com.edu.people.api.dto.TeacherView;
import com.edu.people.application.command.CreateTeacherCommand;
import com.edu.people.application.command.UpdateTeacherCommand;
import com.edu.people.application.port.out.PeopleUserQuery;
import com.edu.people.domain.exception.DuplicateTeacherCodeException;
import com.edu.people.domain.exception.InvalidUserException;
import com.edu.people.domain.model.TeacherStatus;
import com.edu.people.infrastructure.persistence.entity.TeacherEntity;
import com.edu.people.infrastructure.persistence.repository.TeacherJpaRepository;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
class TeacherServiceTest {

    @Mock
    private TeacherJpaRepository teacherRepository;

    @Mock
    private PeopleUserQuery peopleUserQuery;

    private TeacherService teacherService;

    @BeforeEach
    void setUp() {
        teacherService = new TeacherService(teacherRepository, peopleUserQuery);
    }

    @Test
    void createTeacher_whenUserNotFoundInIdentity_throwsInvalidUserException() {
        UUID userId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(false);

        CreateTeacherCommand command = new CreateTeacherCommand(
                userId,
                "TCH001",
                "Tran Thi B",
                "Computer Science",
                UUID.randomUUID()
        );

        assertThatThrownBy(() -> teacherService.createTeacher(command))
                .isInstanceOf(InvalidUserException.class);
        verify(teacherRepository, never()).save(any());
    }

    @Test
    void createTeacher_whenCodeAlreadyExists_throwsDuplicateTeacherCodeException() {
        UUID userId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(true);
        when(teacherRepository.existsByTeacherCode("TCH001")).thenReturn(true);

        CreateTeacherCommand command = new CreateTeacherCommand(
                userId,
                "TCH001",
                "Tran Thi B",
                "Computer Science",
                UUID.randomUUID()
        );

        assertThatThrownBy(() -> teacherService.createTeacher(command))
                .isInstanceOf(DuplicateTeacherCodeException.class);
    }

    @Test
    void createTeacher_success_savesAndReturnsView() {
        UUID userId = UUID.randomUUID();
        UUID orgId = UUID.randomUUID();
        when(peopleUserQuery.userExists(userId)).thenReturn(true);
        when(teacherRepository.existsByTeacherCode("TCH001")).thenReturn(false);
        when(teacherRepository.save(any(TeacherEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CreateTeacherCommand command = new CreateTeacherCommand(
                userId,
                "TCH001",
                "Tran Thi B",
                "Computer Science",
                orgId
        );

        TeacherView result = teacherService.createTeacher(command);

        assertThat(result).isNotNull();
        assertThat(result.teacherCode()).isEqualTo("TCH001");
        assertThat(result.status()).isEqualTo(TeacherStatus.ACTIVE);
        verify(teacherRepository).save(any(TeacherEntity.class));
    }

    @Test
    void updateTeacher_success_updatesFieldsAndReturnsView() {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherEntity existing = new TeacherEntity(
                teacherId,
                UUID.randomUUID(),
                "TCH001",
                "Tran Thi B",
                "Math",
                orgId,
                TeacherStatus.ACTIVE
        );
        when(teacherRepository.findByIdAndOrganizationId(teacherId, orgId)).thenReturn(Optional.of(existing));
        when(teacherRepository.save(any(TeacherEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateTeacherCommand command = new UpdateTeacherCommand(
                "Tran Thi B Updated",
                "Physics",
                TeacherStatus.ON_LEAVE
        );

        TeacherView result = teacherService.updateTeacher(orgId, teacherId, command);

        assertThat(result.fullName()).isEqualTo("Tran Thi B Updated");
        assertThat(result.specialization()).isEqualTo("Physics");
        assertThat(result.status()).isEqualTo(TeacherStatus.ON_LEAVE);
        verify(teacherRepository).save(existing);
    }

    @Test
    void deactivateTeacher_success_setsStatusToInactive() {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherEntity existing = new TeacherEntity(
                teacherId,
                UUID.randomUUID(),
                "TCH001",
                "Tran Thi B",
                "Math",
                orgId,
                TeacherStatus.ACTIVE
        );
        when(teacherRepository.findByIdAndOrganizationId(teacherId, orgId)).thenReturn(Optional.of(existing));
        when(teacherRepository.save(any(TeacherEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TeacherView result = teacherService.deactivateTeacher(orgId, teacherId);

        assertThat(result.status()).isEqualTo(TeacherStatus.INACTIVE);
        verify(teacherRepository).save(existing);
    }

    @Test
    void getTeacher_whenNotFound_throwsResourceNotFoundException() {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        when(teacherRepository.findByIdAndOrganizationId(teacherId, orgId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> teacherService.getTeacher(orgId, teacherId))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void listTeachersByOrganization_returnsList() {
        UUID orgId = UUID.randomUUID();
        TeacherEntity entity = new TeacherEntity(
                UUID.randomUUID(),
                UUID.randomUUID(),
                "TCH001",
                "Tran Thi B",
                "Math",
                orgId,
                TeacherStatus.ACTIVE
        );
        when(teacherRepository.findAllByOrganizationId(orgId)).thenReturn(List.of(entity));

        List<TeacherView> results = teacherService.listTeachersByOrganization(orgId);

        assertThat(results).hasSize(1);
        assertThat(results.get(0).teacherCode()).isEqualTo("TCH001");
    }
}
