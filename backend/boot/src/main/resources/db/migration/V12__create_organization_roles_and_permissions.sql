CREATE TABLE IF NOT EXISTS organization.permissions (
    id UUID PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    description TEXT,
    scope VARCHAR(20) NOT NULL DEFAULT 'ORGANIZATION',
    CONSTRAINT uk_permissions_code UNIQUE (code),
    CONSTRAINT ck_permissions_scope CHECK (scope IN ('SYSTEM', 'ORGANIZATION'))
);

CREATE TABLE IF NOT EXISTS organization.roles (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_roles_organization FOREIGN KEY (organization_id)
        REFERENCES organization.organizations (id),
    CONSTRAINT uk_roles_org_name UNIQUE (organization_id, name)
);

CREATE TABLE IF NOT EXISTS organization.role_permissions (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_rp_role FOREIGN KEY (role_id)
        REFERENCES organization.roles (id),
    CONSTRAINT fk_rp_permission FOREIGN KEY (permission_id)
        REFERENCES organization.permissions (id)
);

CREATE TABLE IF NOT EXISTS organization.membership_roles (
    membership_id UUID NOT NULL,
    role_id UUID NOT NULL,
    PRIMARY KEY (membership_id, role_id),
    CONSTRAINT fk_mr_membership FOREIGN KEY (membership_id)
        REFERENCES organization.organization_memberships (id),
    CONSTRAINT fk_mr_role FOREIGN KEY (role_id)
        REFERENCES organization.roles (id)
);

INSERT INTO organization.permissions (id, code, description, scope) VALUES
    (gen_random_uuid(), 'ORGANIZATION_MEMBER_INVITE', 'Invite organization members', 'ORGANIZATION'),
    (gen_random_uuid(), 'ORGANIZATION_MEMBER_REVOKE', 'Revoke organization memberships', 'ORGANIZATION'),
    (gen_random_uuid(), 'ORGANIZATION_SETTINGS_WRITE', 'Update organization settings', 'ORGANIZATION'),
    (gen_random_uuid(), 'PEOPLE_STUDENT_WRITE', 'Create and update students', 'ORGANIZATION'),
    (gen_random_uuid(), 'PEOPLE_TEACHER_WRITE', 'Create and update teachers', 'ORGANIZATION'),
    (gen_random_uuid(), 'CURRICULUM_SUBJECT_READ', 'Read subjects', 'ORGANIZATION'),
    (gen_random_uuid(), 'CURRICULUM_SUBJECT_WRITE', 'Create and update subjects', 'ORGANIZATION'),
    (gen_random_uuid(), 'CURRICULUM_CURRICULUM_READ', 'Read curricula', 'ORGANIZATION'),
    (gen_random_uuid(), 'CURRICULUM_CURRICULUM_WRITE', 'Create and update curricula', 'ORGANIZATION'),
    (gen_random_uuid(), 'ACADEMIC_CLASS_WRITE', 'Create and update classes', 'ORGANIZATION'),
    (gen_random_uuid(), 'ATTENDANCE_RECORD_WRITE', 'Record attendance', 'ORGANIZATION'),
    (gen_random_uuid(), 'ASSESSMENT_GRADE_WRITE', 'Write grades', 'ORGANIZATION'),
    (gen_random_uuid(), 'ASSESSMENT_GRADE_READ', 'Read grades', 'ORGANIZATION'),
    (gen_random_uuid(), 'CERTIFICATION_EVALUATE', 'Evaluate certification eligibility', 'ORGANIZATION')
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    scope = EXCLUDED.scope;
