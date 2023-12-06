package com.vetappointmentsystem.vas;

import com.vetappointmentsystem.vas.service.jwt.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@AutoConfigureTestDatabase
@SpringBootTest
public class JwtServiceUnitTests {
    @Autowired
    private JwtService jwtService;

    @Test
    public void testGenerateToken() {
        UserDetails userDetails = User.builder()
                .username("testUser")
                .password(new BCryptPasswordEncoder().encode("password"))
                .build();

        String token = jwtService.generateToken(userDetails);
        assertFalse(token.isEmpty());
    }

    @Test
    public void testExtractUsername() {
        UserDetails userDetails = User.builder()
                .username("testUser")
                .password(new BCryptPasswordEncoder().encode("password"))
                .build();

        String token = jwtService.generateToken(userDetails);
        String username = jwtService.extractUsername(token);
        assertEquals(userDetails.getUsername(), username);
    }

    @Test
    public void testIsTokenValid() {
        UserDetails userDetails = User.builder()
                .username("testUser")
                .password(new BCryptPasswordEncoder().encode("password"))
                .build();

        String token = jwtService.generateToken(userDetails);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }
}
