package com.edu.enrollment.infrastructure.persistence.entity;

import com.edu.enrollment.domain.model.EnrollmentStatus;
import com.edu.shared.kernel.persistence.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "enrollments",
        schema = "enrollment",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_enrollment_student_subject_semester",
                columnNames = {"student_id", "subject_id", "semester_id"}
        )
)
public class EnrollmentEntity extends AuditableEntity {

    @Id
    private UUID id;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "subject_id", nullable = false)
    private UUID subjectId;

    @Column(name = "class_room_id", nullable = false)
    private UUID classRoomId;

    @Column(name = "semester_id", nullable = false)
    private UUID semesterId;

    @Column(name = "organization_id", nullable = false)
    private UUID organizationId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EnrollmentStatus status;

    @Column(name = "enrolled_at", nullable = false)
    private Instant enrolledAt;

    @Column(name = "withdrawn_at")
    private Instant withdrawnAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    protected EnrollmentEntity() {
    }

    public EnrollmentEntity(UUID id, UUID studentId, UUID subjectId, UUID classRoomId,
                            UUID semesterId, UUID organizationId, Instant enrolledAt) {
        this.id = id;
        this.studentId = studentId;
        this.subjectId = subjectId;
        this.classRoomId = classRoomId;
        this.semesterId = semesterId;
        this.organizationId = organizationId;
        this.status = EnrollmentStatus.ENROLLED;
        this.enrolledAt = enrolledAt;
    }

    public UUID getId() { return id; }
    public UUID getStudentId() { return studentId; }
    public UUID getSubjectId() { return subjectId; }
    public UUID getClassRoomId() { return classRoomId; }
    public UUID getSemesterId() { return semesterId; }
    public UUID getOrganizationId() { return organizationId; }
    public EnrollmentStatus getStatus() { return status; }
    public Instant getEnrolledAt() { return enrolledAt; }
    public Instant getWithdrawnAt() { return withdrawnAt; }
    public Instant getCompletedAt() { return completedAt; }

    public void withdraw(Instant withdrawnAt) {
        this.status = EnrollmentStatus.WITHDRAWN;
        this.withdrawnAt = withdrawnAt;
    }

    public void complete(Instant completedAt) {
        this.status = EnrollmentStatus.COMPLETED;
        this.completedAt = completedAt;
    }
}
