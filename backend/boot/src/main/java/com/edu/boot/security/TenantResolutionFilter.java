package com.edu.boot.security;

import com.edu.organization.application.port.OrganizationMembershipQuery;
import com.edu.shared.kernel.domain.identifier.OrganizationId;
import com.edu.shared.kernel.domain.identifier.UserId;
import com.edu.shared.kernel.domain.tenant.TenantContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class TenantResolutionFilter extends OncePerRequestFilter {

    private final OrganizationMembershipQuery organizationMembershipQuery;

    public TenantResolutionFilter(OrganizationMembershipQuery organizationMembershipQuery) {
        this.organizationMembershipQuery = organizationMembershipQuery;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            String orgHeader = request.getHeader("X-Organization-Id");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (orgHeader != null && !orgHeader.isBlank() && authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
                UUID userId = UUID.fromString(jwt.getSubject());
                UUID orgId = UUID.fromString(orgHeader.trim());

                var membershipOpt = organizationMembershipQuery.findActiveMembership(userId, orgId);

                if (membershipOpt.isEmpty() || !"ACTIVE".equalsIgnoreCase(membershipOpt.get().status())) {
                    throw new AccessDeniedException("User is not an active member of organization: " + orgId);
                }

                var membership = membershipOpt.get();
                TenantContext.set(
                        new UserId(userId),
                        new OrganizationId(orgId),
                        membership.role()
                );

                Set<String> permissionCodes = new HashSet<>(
                        organizationMembershipQuery.findPermissionCodesByMembershipId(membership.membershipId())
                );
                permissionCodes.addAll(defaultPermissionCodes(membership.role()));
                var authorities = permissionCodes.stream()
                        .map(SimpleGrantedAuthority::new)
                        .toList();
                SecurityContextHolder.getContext().setAuthentication(
                        new JwtAuthenticationToken(jwt, authorities)
                );
            }

            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/v1/auth/") || path.startsWith("/actuator/");
    }

    private Set<String> defaultPermissionCodes(String role) {
        return switch (role.toUpperCase()) {
            case "OWNER" -> Set.of(
                    "ORGANIZATION_MEMBER_INVITE",
                    "ORGANIZATION_MEMBER_REVOKE",
                    "ORGANIZATION_SETTINGS_WRITE",
                    "PEOPLE_STUDENT_WRITE",
                    "PEOPLE_TEACHER_WRITE",
                    "CURRICULUM_SUBJECT_WRITE",
                    "CURRICULUM_SUBJECT_READ",
                    "CURRICULUM_CURRICULUM_WRITE",
                    "CURRICULUM_CURRICULUM_READ",
                    "ACADEMIC_CLASS_WRITE",
                    "ATTENDANCE_RECORD_WRITE",
                    "ASSESSMENT_GRADE_WRITE",
                    "ASSESSMENT_GRADE_READ",
                    "CERTIFICATION_EVALUATE"
            );
            case "ADMIN" -> Set.of(
                    "ORGANIZATION_MEMBER_INVITE",
                    "ORGANIZATION_MEMBER_REVOKE",
                    "PEOPLE_STUDENT_WRITE",
                    "PEOPLE_TEACHER_WRITE",
                    "CURRICULUM_SUBJECT_WRITE",
                    "CURRICULUM_SUBJECT_READ",
                    "CURRICULUM_CURRICULUM_WRITE",
                    "CURRICULUM_CURRICULUM_READ",
                    "ACADEMIC_CLASS_WRITE",
                    "ATTENDANCE_RECORD_WRITE",
                    "ASSESSMENT_GRADE_WRITE",
                    "ASSESSMENT_GRADE_READ"
            );
            default -> Set.of(
                    "CURRICULUM_SUBJECT_READ",
                    "CURRICULUM_CURRICULUM_READ",
                    "ASSESSMENT_GRADE_READ"
            );
        };
    }
}
