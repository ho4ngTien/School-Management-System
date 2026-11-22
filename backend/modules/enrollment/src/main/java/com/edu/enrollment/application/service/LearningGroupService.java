package com.edu.enrollment.application.service;

import com.edu.academic.infrastructure.persistence.repository.ClassRoomJpaRepository;
import com.edu.enrollment.api.dto.LearningGroupView;
import com.edu.enrollment.application.command.CreateLearningGroupCommand;
import com.edu.enrollment.application.command.UpdateLearningGroupCommand;
import com.edu.enrollment.domain.exception.InvalidEnrollmentStateException;
import com.edu.enrollment.infrastructure.persistence.entity.LearningGroupEntity;
import com.edu.enrollment.infrastructure.persistence.repository.LearningGroupJpaRepository;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class LearningGroupService {

    private final LearningGroupJpaRepository learningGroupRepository;
    private final ClassRoomJpaRepository classRoomRepository;

    public LearningGroupService(
            LearningGroupJpaRepository learningGroupRepository,
            ClassRoomJpaRepository classRoomRepository
    ) {
        this.learningGroupRepository = learningGroupRepository;
        this.classRoomRepository = classRoomRepository;
    }

    public LearningGroupView create(CreateLearningGroupCommand command) {
        classRoomRepository.findByIdAndOrganizationId(command.classRoomId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("ClassRoom", command.classRoomId().toString()));
        validateMaxMembers(command.maxMembers());

        LearningGroupEntity entity = new LearningGroupEntity(
                UUID.randomUUID(),
                command.classRoomId(),
                command.name().trim(),
                command.description(),
                command.organizationId(),
                command.maxMembers()
        );
        return toView(learningGroupRepository.save(entity));
    }

    @Transactional(readOnly = true)
    public List<LearningGroupView> list(UUID organizationId, UUID classRoomId) {
        classRoomRepository.findByIdAndOrganizationId(classRoomId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("ClassRoom", classRoomId.toString()));
        return learningGroupRepository.findAllByClassRoomIdAndOrganizationId(classRoomId, organizationId)
                .stream().map(this::toView).toList();
    }

    public LearningGroupView update(
            UUID organizationId,
            UUID classRoomId,
            UUID groupId,
            UpdateLearningGroupCommand command
    ) {
        validateMaxMembers(command.maxMembers());
        LearningGroupEntity entity = learningGroupRepository
                .findByIdAndClassRoomIdAndOrganizationId(groupId, classRoomId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("LearningGroup", groupId.toString()));
        entity.setName(command.name().trim());
        entity.setDescription(command.description());
        entity.setMaxMembers(command.maxMembers());
        return toView(learningGroupRepository.save(entity));
    }

    private void validateMaxMembers(Integer maxMembers) {
        if (maxMembers != null && maxMembers <= 0) {
            throw new InvalidEnrollmentStateException("Maximum members must be positive");
        }
    }

    private LearningGroupView toView(LearningGroupEntity entity) {
        return new LearningGroupView(
                entity.getId(),
                entity.getClassRoomId(),
                entity.getName(),
                entity.getDescription(),
                entity.getOrganizationId(),
                entity.getMaxMembers(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
