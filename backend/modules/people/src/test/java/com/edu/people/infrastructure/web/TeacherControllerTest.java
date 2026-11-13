package com.edu.people.infrastructure.web;

import com.edu.people.api.dto.TeacherView;
import com.edu.people.application.command.CreateTeacherCommand;
import com.edu.people.application.command.UpdateTeacherCommand;
import com.edu.people.application.service.TeacherService;
import com.edu.people.domain.model.TeacherStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TeacherControllerTest {

    @Mock
    private TeacherService teacherService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(new TeacherController(teacherService))
                .build();
    }

    @Test
    @DisplayName("POST /api/v1/organizations/{orgId}/teachers creates teacher and returns 201")
    void createTeacherSuccess() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        TeacherView view = new TeacherView(
                teacherId,
                userId,
                "TCH2024001",
                "Tran Thi B",
                "Computer Science",
                orgId,
                TeacherStatus.ACTIVE,
                Instant.now(),
                Instant.now()
        );

        given(teacherService.createTeacher(any(CreateTeacherCommand.class))).willReturn(view);

        String json = """
                {
                    "userId": "%s",
                    "teacherCode": "TCH2024001",
                    "fullName": "Tran Thi B",
                    "specialization": "Computer Science"
                }
                """.formatted(userId);

        mockMvc.perform(post("/api/v1/organizations/{organizationId}/teachers", orgId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(teacherId.toString()))
                .andExpect(jsonPath("$.teacherCode").value("TCH2024001"))
                .andExpect(jsonPath("$.fullName").value("Tran Thi B"))
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    @DisplayName("GET /api/v1/organizations/{orgId}/teachers returns 200 with list")
    void listTeachers() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherView view = new TeacherView(
                teacherId,
                UUID.randomUUID(),
                "TCH2024001",
                "Tran Thi B",
                "Computer Science",
                orgId,
                TeacherStatus.ACTIVE,
                Instant.now(),
                Instant.now()
        );

        given(teacherService.listTeachersByOrganization(orgId)).willReturn(List.of(view));

        mockMvc.perform(get("/api/v1/organizations/{organizationId}/teachers", orgId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].teacherCode").value("TCH2024001"));
    }

    @Test
    @DisplayName("GET /api/v1/organizations/{orgId}/teachers/{teacherId} returns 200 with teacher")
    void getTeacherById() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherView view = new TeacherView(
                teacherId,
                UUID.randomUUID(),
                "TCH2024001",
                "Tran Thi B",
                "Computer Science",
                orgId,
                TeacherStatus.ACTIVE,
                Instant.now(),
                Instant.now()
        );

        given(teacherService.getTeacher(orgId, teacherId)).willReturn(view);

        mockMvc.perform(get("/api/v1/organizations/{organizationId}/teachers/{teacherId}", orgId, teacherId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(teacherId.toString()))
                .andExpect(jsonPath("$.fullName").value("Tran Thi B"));
    }

    @Test
    @DisplayName("PUT /api/v1/organizations/{orgId}/teachers/{teacherId} updates and returns 200")
    void updateTeacher() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherView view = new TeacherView(
                teacherId,
                UUID.randomUUID(),
                "TCH2024001",
                "Tran Thi B Updated",
                "Physics",
                orgId,
                TeacherStatus.ON_LEAVE,
                Instant.now(),
                Instant.now()
        );

        given(teacherService.updateTeacher(eq(orgId), eq(teacherId), any(UpdateTeacherCommand.class))).willReturn(view);

        String json = """
                {
                    "fullName": "Tran Thi B Updated",
                    "specialization": "Physics",
                    "status": "ON_LEAVE"
                }
                """;

        mockMvc.perform(put("/api/v1/organizations/{organizationId}/teachers/{teacherId}", orgId, teacherId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Tran Thi B Updated"))
                .andExpect(jsonPath("$.specialization").value("Physics"))
                .andExpect(jsonPath("$.status").value("ON_LEAVE"));
    }

    @Test
    @DisplayName("DELETE /api/v1/organizations/{orgId}/teachers/{teacherId} deactivates and returns 200")
    void deactivateTeacher() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID teacherId = UUID.randomUUID();
        TeacherView view = new TeacherView(
                teacherId,
                UUID.randomUUID(),
                "TCH2024001",
                "Tran Thi B",
                "Math",
                orgId,
                TeacherStatus.INACTIVE,
                Instant.now(),
                Instant.now()
        );

        given(teacherService.deactivateTeacher(orgId, teacherId)).willReturn(view);

        mockMvc.perform(delete("/api/v1/organizations/{organizationId}/teachers/{teacherId}", orgId, teacherId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("INACTIVE"));
    }
}

