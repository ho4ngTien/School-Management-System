package com.edu.organization.application.service;

import com.edu.organization.application.port.OrganizationMembershipQuery;
import com.edu.organization.infrastructure.persistence.repository.OrganizationMembershipJpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class OrganizationMembershipQueryAdapter implements OrganizationMembershipQuery {

    private final OrganizationMembershipJpaRepository membershipRepository;
    private final JdbcTemplate jdbcTemplate;

    public OrganizationMembershipQueryAdapter(OrganizationMembershipJpaRepository membershipRepository) {
        this(membershipRepository, null);
    }

    @Autowired
    public OrganizationMembershipQueryAdapter(
            OrganizationMembershipJpaRepository membershipRepository,
            JdbcTemplate jdbcTemplate
    ) {
        this.membershipRepository = membershipRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<MembershipDetails> findActiveMembership(UUID userId, UUID organizationId) {
        return membershipRepository.findByOrganizationIdAndUserId(organizationId, userId)
                .filter(m -> "ACTIVE".equalsIgnoreCase(m.getStatus().name()))
                .map(m -> new MembershipDetails(
                        m.getId(),
                        m.getUserId(),
                        m.getOrganizationId(),
                        m.getRole().name(),
                        m.getStatus().name()
                ));
    }

    @Override
    public Set<String> findPermissionCodesByMembershipId(UUID membershipId) {
        if (jdbcTemplate == null) {
            return Set.of();
        }
        String sql = """
                SELECT DISTINCT p.code
                FROM organization.permissions p
                LEFT JOIN organization.role_permissions rp ON rp.permission_id = p.id
                LEFT JOIN organization.membership_roles mr ON mr.role_id = rp.role_id
                    AND mr.membership_id = ?
                WHERE mr.membership_id IS NOT NULL
                """;
        return new HashSet<>(jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("code"), membershipId));
    }
}
