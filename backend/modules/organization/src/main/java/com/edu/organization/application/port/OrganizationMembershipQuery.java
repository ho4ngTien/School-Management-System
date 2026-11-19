package com.edu.organization.application.port;

import java.util.Optional;
import java.util.UUID;

public interface OrganizationMembershipQuery {

    Optional<MembershipDetails> findActiveMembership(UUID userId, UUID organizationId);

    default java.util.Set<String> findPermissionCodesByMembershipId(UUID membershipId) {
        return java.util.Set.of();
    }

    record MembershipDetails(
            UUID membershipId,
            UUID userId,
            UUID organizationId,
            String role,           // OWNER, ADMIN, MEMBER
            String status          // ACTIVE, SUSPENDED
    ) {
    }
}
