package com.vetappointmentsystem.vas;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.repository.UserRepository;
import com.vetappointmentsystem.vas.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ActiveProfiles("test")
@AutoConfigureTestDatabase
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = VasApplication.class)
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = SecurityAutoConfiguration.class)
public class AuthRestControllerIntegrationTests {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    @Test
    public void whenValidInput_thenCreateUser() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        UserEntity user = new UserEntity("Jan", "Kowalski", "kowalski@mail.com", "P@ssw0rd", "123456789");
        mvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user))).andDo(print());
        List<UserEntity> found = userRepository.findAll();

        assertThat(found).extracting(UserEntity::getEmail)
                .contains("kowalski@mail.com");
    }

    @BeforeEach
    private void deleteUsers() {
        userRepository.deleteAll();
        userService.saveAdmin(new UserEntity("Admin", "Adminski", "admin@admin.com", "P@ssw0rd", "000000000"));
    }
}