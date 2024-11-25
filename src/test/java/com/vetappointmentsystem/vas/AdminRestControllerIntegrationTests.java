package com.vetappointmentsystem.vas;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.domain.UserRoleEnum;
import com.vetappointmentsystem.vas.repository.UserRepository;
import com.vetappointmentsystem.vas.service.user.UserService;
import org.json.JSONObject;
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
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@AutoConfigureTestDatabase
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = VasApplication.class)
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = SecurityAutoConfiguration.class)
public class AdminRestControllerIntegrationTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void givenUsers_whenGetUsers_thenStatus200() throws Exception {
        createTestUser("Adam", "Nowak", "nowak@mail.com", "P@ssw0rd1", "234567890");
        createTestUser("Kasia", "Kowalska", "kowalska@mail.com", "P@ssw0rd2", "345678901");
        JSONObject admin = new JSONObject();
        admin.put("email", "admin@admin.com");
        admin.put("password", "P@ssw0rd");
        MvcResult result = mvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON).content(String.valueOf(admin))).andReturn();
        JSONObject jsonResult = new JSONObject(result.getResponse().getContentAsString());

        mvc.perform(get("/api/admin/users")
                        .header("Authorization", "Bearer " + jsonResult.getString("token"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].email", is("nowak@mail.com")))
                .andExpect(jsonPath("$[1].email", is("kowalska@mail.com")));
    }

    private void createTestUser(String firstName, String lastName, String email, String password, String phone) {
        UserEntity user = new UserEntity(firstName, lastName, email, password, phone, UserRoleEnum.USER);
        userRepository.saveAndFlush(user);
    }

    @BeforeEach
    public void deleteUsers() {
        userRepository.deleteAll();
        userService.saveAdmin(new UserEntity("Admin", "Adminski", "admin@admin.com", "P@ssw0rd", "000000000"));
    }
}