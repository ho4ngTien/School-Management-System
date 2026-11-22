package com.edu.enrollment.infrastructure.persistence.entity;

import com.edu.shared.kernel.persistence.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "learning_groups", schema = "enrollment")
public class LearningGroupEntity extends AuditableEntity {

    @Id
    private UUID id;

    @Column(name = "class_room_id", nullable = false)
    private UUID classRoomId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Column(name = "max_members")
    private Integer maxMembers;

    protected LearningGroupEntity() {
    }

    public LearningGroupEntity(UUID id, UUID classRoomId, String name, String description,
                               UUID organizationId, Integer maxMembers) {
        this.id = id;
        this.classRoomId = classRoomId;
        this.name = name;
        this.description = description;
        this.organizationId = organizationId;
        this.maxMembers = maxMembers;
    }

    public UUID getId() { return id; }
    public UUID getClassRoomId() { return classRoomId; }
    public UUID getOrganizationId() { return organizationId; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Integer getMaxMembers() { return maxMembers; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setMaxMembers(Integer maxMembers) { this.maxMembers = maxMembers; }
}
