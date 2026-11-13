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
import com.edu.shared.kernel.domain.tenant.TenantContext;
import com.edu.shared.kernel.exception.BusinessException;
import com.edu.shared.kernel.exception.ErrorCode;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class StudentService {

    private final StudentJpaRepository studentRepository;
    private final PeopleUserQuery peopleUserQuery;

    public StudentService(
            StudentJpaRepository studentRepository,
            @Autowired(required = false) PeopleUserQuery peopleUserQuery
    ) {
        this.studentRepository = studentRepository;
        this.peopleUserQuery = peopleUserQuery;
    }

    public StudentView createStudent(CreateStudentCommand command) {
        assertNotTeacherRole();

        if (peopleUserQuery != null && !peopleUserQuery.userExists(command.userId())) {
            throw new InvalidUserException(command.userId());
        }

        String trimmedCode = command.studentCode().trim();
        if (studentRepository.existsByStudentCode(trimmedCode)) {
            throw new DuplicateStudentCodeException(trimmedCode);
        }

        StudentEntity entity = new StudentEntity(
                UUID.randomUUID(),
                command.userId(),
                trimmedCode,
                command.fullName().trim(),
                command.dateOfBirth(),
                command.organizationId(),
                StudentStatus.ACTIVE,
                command.enrolledAt()
        );

        StudentEntity saved = studentRepository.save(entity);
        return toView(saved);
    }

    public StudentView updateStudent(UUID organizationId, UUID studentId, UpdateStudentCommand command) {
        assertNotTeacherRole();

        StudentEntity entity = studentRepository.findByIdAndOrganizationId(studentId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", studentId.toString()));

        if (command.fullName() != null && !command.fullName().isBlank()) {
            entity.setFullName(command.fullName().trim());
        }
        if (command.dateOfBirth() != null) {
            entity.setDateOfBirth(command.dateOfBirth());
        }
        if (command.enrolledAt() != null) {
            entity.setEnrolledAt(command.enrolledAt());
        }
        if (command.status() != null) {
            entity.setStatus(command.status());
        }

        StudentEntity saved = studentRepository.save(entity);
        return toView(saved);
    }

    @Transactional(readOnly = true)
    public List<StudentView> listStudentsByOrganization(UUID organizationId) {
        return studentRepository.findAllByOrganizationId(organizationId)
                .stream()
                .map(this::toView)
                .toList();
    }

    @Transactional(readOnly = true)
    public StudentView getStudent(UUID organizationId, UUID studentId) {
        return studentRepository.findByIdAndOrganizationId(studentId, organizationId)
                .map(this::toView)
                .orElseThrow(() -> new ResourceNotFoundException("Student", studentId.toString()));
    }

    public StudentView deactivateStudent(UUID organizationId, UUID studentId) {
        assertNotTeacherRole();

        StudentEntity entity = studentRepository.findByIdAndOrganizationId(studentId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", studentId.toString()));
        entity.setStatus(StudentStatus.INACTIVE);
        StudentEntity saved = studentRepository.save(entity);
        return toView(saved);
    }

    private void assertNotTeacherRole() {
        TenantContext.get().ifPresent(tenant -> {
            if ("TEACHER".equalsIgnoreCase(tenant.role())) {
                throw new BusinessException(
                        ErrorCode.ACCESS_DENIED,
                        "Teachers are not allowed to manage student profiles",
                        403
                );
            }
        });
    }

    private StudentView toView(StudentEntity entity) {
        return new StudentView(
                entity.getId(),
                entity.getUserId(),
                entity.getStudentCode(),
                entity.getFullName(),
                entity.getDateOfBirth(),
                entity.getOrganizationId(),
                entity.getStatus(),
                entity.getEnrolledAt(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
