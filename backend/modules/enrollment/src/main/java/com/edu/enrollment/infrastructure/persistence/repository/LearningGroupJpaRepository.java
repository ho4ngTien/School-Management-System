package com.edu.enrollment.infrastructure.persistence.repository;

import com.edu.enrollment.infrastructure.persistence.entity.LearningGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LearningGroupJpaRepository extends JpaRepository<LearningGroupEntity, UUID> {
    List<LearningGroupEntity> findAllByClassRoomIdAndOrganizationId(UUID classRoomId, UUID organizationId);
    Optional<LearningGroupEntity> findByIdAndClassRoomIdAndOrganizationId(
            UUID id, UUID classRoomId, UUID organizationId);
}
