package com.edu.enrollment.infrastructure.persistence.repository;

import com.edu.enrollment.domain.model.EnrollmentStatus;
import com.edu.enrollment.infrastructure.persistence.entity.EnrollmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentJpaRepository extends JpaRepository<EnrollmentEntity, UUID> {
    boolean existsByStudentIdAndSubjectIdAndSemesterId(UUID studentId, UUID subjectId, UUID semesterId);
    long countByClassRoomIdAndStatus(UUID classRoomId, EnrollmentStatus status);
    Optional<EnrollmentEntity> findByIdAndOrganizationId(UUID id, UUID organizationId);
    List<EnrollmentEntity> findAllByOrganizationId(UUID organizationId);
    List<EnrollmentEntity> findAllByOrganizationIdAndStudentId(UUID organizationId, UUID studentId);
    List<EnrollmentEntity> findAllByOrganizationIdAndSemesterId(UUID organizationId, UUID semesterId);
    List<EnrollmentEntity> findAllByOrganizationIdAndStudentIdAndSemesterId(
            UUID organizationId, UUID studentId, UUID semesterId);
}
