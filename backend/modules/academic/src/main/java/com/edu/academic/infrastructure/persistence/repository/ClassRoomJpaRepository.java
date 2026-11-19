package com.edu.academic.infrastructure.persistence.repository;

import com.edu.academic.infrastructure.persistence.entity.ClassRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClassRoomJpaRepository extends JpaRepository<ClassRoomEntity, UUID> {
    boolean existsByCodeAndOrganizationId(String code, UUID organizationId);
    boolean existsByCodeAndOrganizationIdAndIdNot(String code, UUID organizationId, UUID id);
    List<ClassRoomEntity> findAllByOrganizationId(UUID organizationId);
    Optional<ClassRoomEntity> findByIdAndOrganizationId(UUID id, UUID organizationId);
}

