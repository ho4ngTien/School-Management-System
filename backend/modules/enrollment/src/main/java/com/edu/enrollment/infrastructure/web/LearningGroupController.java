package com.edu.enrollment.infrastructure.web;

import com.edu.enrollment.api.dto.CreateLearningGroupRequest;
import com.edu.enrollment.api.dto.LearningGroupView;
import com.edu.enrollment.api.dto.UpdateLearningGroupRequest;
import com.edu.enrollment.application.command.CreateLearningGroupCommand;
import com.edu.enrollment.application.command.UpdateLearningGroupCommand;
import com.edu.enrollment.application.service.LearningGroupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/organizations/{organizationId}/classes/{classId}/learning-groups")
public class LearningGroupController {

    private final LearningGroupService learningGroupService;

    public LearningGroupController(LearningGroupService learningGroupService) {
        this.learningGroupService = learningGroupService;
    }

    @GetMapping
    public ResponseEntity<List<LearningGroupView>> list(
            @PathVariable UUID organizationId,
            @PathVariable UUID classId
    ) {
        return ResponseEntity.ok(learningGroupService.list(organizationId, classId));
    }

    @PostMapping
    public ResponseEntity<LearningGroupView> create(
            @PathVariable UUID organizationId,
            @PathVariable UUID classId,
            @Valid @RequestBody CreateLearningGroupRequest request
    ) {
        CreateLearningGroupCommand command = new CreateLearningGroupCommand(
                classId,
                request.name(),
                request.description(),
                organizationId,
                request.maxMembers()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(learningGroupService.create(command));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<LearningGroupView> update(
            @PathVariable UUID organizationId,
            @PathVariable UUID classId,
            @PathVariable UUID groupId,
            @Valid @RequestBody UpdateLearningGroupRequest request
    ) {
        UpdateLearningGroupCommand command = new UpdateLearningGroupCommand(
                request.name(),
                request.description(),
                request.maxMembers()
        );
        return ResponseEntity.ok(
                learningGroupService.update(organizationId, classId, groupId, command)
        );
    }
}
