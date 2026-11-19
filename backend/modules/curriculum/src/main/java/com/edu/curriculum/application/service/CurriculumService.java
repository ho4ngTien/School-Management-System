package com.edu.curriculum.application.service;

import com.edu.curriculum.api.dto.CurriculumSubjectView;
import com.edu.curriculum.api.dto.CurriculumView;
import com.edu.curriculum.api.dto.UpdateCurriculumRequest;
import com.edu.curriculum.application.command.AssignSubjectCommand;
import com.edu.curriculum.application.command.CreateCurriculumCommand;
import com.edu.curriculum.domain.exception.CurriculumSubjectConflictException;
import com.edu.curriculum.domain.exception.DeprecatedSubjectException;
import com.edu.curriculum.domain.exception.DuplicateCurriculumCodeException;
import com.edu.curriculum.domain.exception.InvalidCurriculumCreditsException;
import com.edu.curriculum.domain.model.SubjectStatus;
import com.edu.curriculum.infrastructure.persistence.entity.CurriculumEntity;
import com.edu.curriculum.infrastructure.persistence.entity.CurriculumSubjectEntity;
import com.edu.curriculum.infrastructure.persistence.entity.SubjectEntity;
import com.edu.curriculum.infrastructure.persistence.repository.CurriculumJpaRepository;
import com.edu.curriculum.infrastructure.persistence.repository.CurriculumSubjectJpaRepository;
import com.edu.curriculum.infrastructure.persistence.repository.SubjectJpaRepository;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CurriculumService {

    private final CurriculumJpaRepository curriculumRepository;
    private final CurriculumSubjectJpaRepository curriculumSubjectRepository;
    private final SubjectJpaRepository subjectRepository;

    public CurriculumService(
            CurriculumJpaRepository curriculumRepository,
            CurriculumSubjectJpaRepository curriculumSubjectRepository,
            SubjectJpaRepository subjectRepository
    ) {
        this.curriculumRepository = curriculumRepository;
        this.curriculumSubjectRepository = curriculumSubjectRepository;
        this.subjectRepository = subjectRepository;
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_WRITE')")
    public CurriculumView createCurriculum(CreateCurriculumCommand command) {
        String trimmedCode = command.code().trim();
        if (curriculumRepository.existsByCodeAndOrganizationId(trimmedCode, command.organizationId())) {
            throw new DuplicateCurriculumCodeException(trimmedCode);
        }

        CurriculumEntity entity = new CurriculumEntity(
                UUID.randomUUID(),
                trimmedCode,
                command.name().trim(),
                command.description() != null ? command.description().trim() : null,
                command.totalCredits(),
                command.organizationId()
        );

        CurriculumEntity saved = curriculumRepository.save(entity);
        return toView(saved);
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_READ')")
    @Transactional(readOnly = true)
    public List<CurriculumView> listByOrganization(UUID organizationId) {
        return curriculumRepository.findAllByOrganizationId(organizationId)
                .stream()
                .map(this::toView)
                .toList();
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_READ')")
    @Transactional(readOnly = true)
    public CurriculumView getById(UUID organizationId, UUID curriculumId) {
        CurriculumEntity entity = curriculumRepository.findByIdAndOrganizationId(curriculumId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", curriculumId.toString()));
        List<CurriculumSubjectView> subjects = curriculumSubjectRepository.findAllByCurriculumId(curriculumId)
                .stream()
                .map(this::toSubjectView)
                .toList();
        return toView(entity, subjects);
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_WRITE')")
    public CurriculumView updateCurriculum(UUID organizationId, UUID curriculumId, UpdateCurriculumRequest request) {
        CurriculumEntity entity = curriculumRepository.findByIdAndOrganizationId(curriculumId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", curriculumId.toString()));

        String trimmedCode = request.code().trim();
        if (!entity.getCode().equals(trimmedCode)
                && curriculumRepository.existsByCodeAndOrganizationIdAndIdNot(trimmedCode, organizationId, curriculumId)) {
            throw new DuplicateCurriculumCodeException(trimmedCode);
        }

        int requiredCredits = requiredCredits(curriculumId);
        if (request.totalCredits() < requiredCredits) {
            throw new InvalidCurriculumCreditsException(request.totalCredits(), requiredCredits);
        }

        entity.setCode(trimmedCode);
        entity.setName(request.name().trim());
        entity.setDescription(request.description() != null ? request.description().trim() : null);
        entity.setTotalCredits(request.totalCredits());
        return toView(curriculumRepository.save(entity), listSubjects(organizationId, curriculumId));
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_WRITE')")
    public void deleteCurriculum(UUID organizationId, UUID curriculumId) {
        CurriculumEntity entity = curriculumRepository.findByIdAndOrganizationId(curriculumId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", curriculumId.toString()));
        curriculumRepository.delete(entity);
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_WRITE')")
    public CurriculumSubjectView assignSubject(AssignSubjectCommand command) {
        // Verify curriculum exists in this organization
        curriculumRepository.findByIdAndOrganizationId(command.curriculumId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", command.curriculumId().toString()));

        // Verify subject exists in this organization
        SubjectEntity subject = subjectRepository.findByIdAndOrganizationId(command.subjectId(), command.organizationId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject", command.subjectId().toString()));

        if (subject.getStatus() == SubjectStatus.DEPRECATED) {
            throw new DeprecatedSubjectException(command.subjectId());
        }

        if (curriculumSubjectRepository.existsByCurriculumIdAndSubjectId(command.curriculumId(), command.subjectId())) {
            throw new CurriculumSubjectConflictException(command.curriculumId(), command.subjectId());
        }

        boolean required = command.isRequired() != null ? command.isRequired() : true;
        if (required) {
            CurriculumEntity curriculum = curriculumRepository
                    .findByIdAndOrganizationId(command.curriculumId(), command.organizationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Curriculum", command.curriculumId().toString()));
            int requiredCredits = requiredCredits(command.curriculumId()) + subject.getCredits();
            if (requiredCredits > curriculum.getTotalCredits()) {
                throw new InvalidCurriculumCreditsException(curriculum.getTotalCredits(), requiredCredits);
            }
        }

        CurriculumSubjectEntity entity = new CurriculumSubjectEntity(
                command.curriculumId(),
                command.subjectId(),
                required,
                command.sequenceOrder()
        );

        CurriculumSubjectEntity saved = curriculumSubjectRepository.save(entity);
        return toSubjectView(saved);
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_READ')")
    @Transactional(readOnly = true)
    public List<CurriculumSubjectView> listSubjects(UUID organizationId, UUID curriculumId) {
        // Verify curriculum exists in org
        curriculumRepository.findByIdAndOrganizationId(curriculumId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", curriculumId.toString()));

        return curriculumSubjectRepository.findAllByCurriculumId(curriculumId)
                .stream()
                .map(this::toSubjectView)
                .toList();
    }

    @PreAuthorize("hasAuthority('CURRICULUM_CURRICULUM_WRITE')")
    public void removeSubject(UUID organizationId, UUID curriculumId, UUID subjectId) {
        curriculumRepository.findByIdAndOrganizationId(curriculumId, organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Curriculum", curriculumId.toString()));

        curriculumSubjectRepository.deleteByCurriculumIdAndSubjectId(curriculumId, subjectId);
    }

    private CurriculumView toView(CurriculumEntity entity) {
        return toView(entity, List.of());
    }

    private CurriculumView toView(CurriculumEntity entity, List<CurriculumSubjectView> subjects) {
        return new CurriculumView(
                entity.getId(),
                entity.getCode(),
                entity.getName(),
                entity.getDescription(),
                entity.getTotalCredits(),
                entity.getOrganizationId(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                subjects
        );
    }

    private int requiredCredits(UUID curriculumId) {
        int credits = 0;
        for (CurriculumSubjectEntity relation : curriculumSubjectRepository.findAllByCurriculumId(curriculumId)) {
            if (Boolean.TRUE.equals(relation.getIsRequired())) {
                credits += subjectRepository.findById(relation.getSubjectId())
                        .map(SubjectEntity::getCredits)
                        .orElse(0);
            }
        }
        return credits;
    }

    private CurriculumSubjectView toSubjectView(CurriculumSubjectEntity entity) {
        return new CurriculumSubjectView(
                entity.getCurriculumId(),
                entity.getSubjectId(),
                entity.getIsRequired(),
                entity.getSequenceOrder(),
                entity.getAssignedAt()
        );
    }
}

