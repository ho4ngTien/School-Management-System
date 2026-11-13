package com.edu.people.infrastructure.web;

import com.edu.people.api.dto.StudentView;
import com.edu.people.application.command.CreateStudentCommand;
import com.edu.people.application.command.UpdateStudentCommand;
import com.edu.people.application.service.StudentService;
import com.edu.people.domain.exception.DuplicateStudentCodeException;
import com.edu.people.domain.model.StudentStatus;
import com.edu.shared.kernel.exception.ResourceNotFoundException;
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
import java.time.LocalDate;
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
class StudentControllerTest {

    @Mock
    private StudentService studentService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(new StudentController(studentService))
                .build();
    }

    @Test
    @DisplayName("POST /api/v1/organizations/{orgId}/students creates student and returns 201")
    void createStudentSuccess() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        StudentView view = new StudentView(
                studentId,
                userId,
                "STU2024001",
                "Nguyen Van An",
                LocalDate.of(2005, 3, 15),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now(),
                Instant.now(),
                Instant.now()
        );

        given(studentService.createStudent(any(CreateStudentCommand.class))).willReturn(view);

        String json = """
                {
                    "userId": "%s",
                    "studentCode": "STU2024001",
                    "fullName": "Nguyen Van An",
                    "dateOfBirth": "2005-03-15"
                }
                """.formatted(userId);

        mockMvc.perform(post("/api/v1/organizations/{organizationId}/students", orgId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(studentId.toString()))
                .andExpect(jsonPath("$.studentCode").value("STU2024001"))
                .andExpect(jsonPath("$.fullName").value("Nguyen Van An"))
                .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    @DisplayName("POST /api/v1/organizations/{orgId}/students returns 400 when missing required fields")
    void createStudentValidationFailure() throws Exception {
        UUID orgId = UUID.randomUUID();

        String json = """
                {
                    "studentCode": "",
                    "fullName": ""
                }
                """;

        mockMvc.perform(post("/api/v1/organizations/{organizationId}/students", orgId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/v1/organizations/{orgId}/students returns 200 with list")
    void listStudents() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentView view = new StudentView(
                studentId,
                UUID.randomUUID(),
                "STU2024001",
                "Nguyen Van An",
                LocalDate.of(2005, 3, 15),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now(),
                Instant.now(),
                Instant.now()
        );

        given(studentService.listStudentsByOrganization(orgId)).willReturn(List.of(view));

        mockMvc.perform(get("/api/v1/organizations/{organizationId}/students", orgId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].studentCode").value("STU2024001"));
    }

    @Test
    @DisplayName("GET /api/v1/organizations/{orgId}/students/{studentId} returns 200 with student")
    void getStudentById() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentView view = new StudentView(
                studentId,
                UUID.randomUUID(),
                "STU2024001",
                "Nguyen Van An",
                LocalDate.of(2005, 3, 15),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now(),
                Instant.now(),
                Instant.now()
        );

        given(studentService.getStudent(orgId, studentId)).willReturn(view);

        mockMvc.perform(get("/api/v1/organizations/{organizationId}/students/{studentId}", orgId, studentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(studentId.toString()))
                .andExpect(jsonPath("$.fullName").value("Nguyen Van An"));
    }

    @Test
    @DisplayName("PUT /api/v1/organizations/{orgId}/students/{studentId} updates and returns 200")
    void updateStudent() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentView view = new StudentView(
                studentId,
                UUID.randomUUID(),
                "STU2024001",
                "Nguyen Van An Updated",
                LocalDate.of(2005, 3, 15),
                orgId,
                StudentStatus.ACTIVE,
                Instant.now(),
                Instant.now(),
                Instant.now()
        );

        given(studentService.updateStudent(eq(orgId), eq(studentId), any(UpdateStudentCommand.class))).willReturn(view);

        String json = """
                {
                    "fullName": "Nguyen Van An Updated",
                    "dateOfBirth": "2005-03-15",
                    "status": "ACTIVE"
                }
                """;

        mockMvc.perform(put("/api/v1/organizations/{organizationId}/students/{studentId}", orgId, studentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Nguyen Van An Updated"));
    }

    @Test
    @DisplayName("DELETE /api/v1/organizations/{orgId}/students/{studentId} deactivates and returns 200")
    void deactivateStudent() throws Exception {
        UUID orgId = UUID.randomUUID();
        UUID studentId = UUID.randomUUID();
        StudentView view = new StudentView(
                studentId,
                UUID.randomUUID(),
                "STU2024001",
                "Nguyen Van An",
                LocalDate.of(2005, 3, 15),
                orgId,
                StudentStatus.INACTIVE,
                Instant.now(),
                Instant.now(),
                Instant.now()
        );

        given(studentService.deactivateStudent(orgId, studentId)).willReturn(view);

        mockMvc.perform(delete("/api/v1/organizations/{organizationId}/students/{studentId}", orgId, studentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("INACTIVE"));
    }
}

