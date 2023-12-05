package com.vetappointmentsystem.vas.controller;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.dto.JwtAuthDTO;
import com.vetappointmentsystem.vas.dto.LoginDTO;
import com.vetappointmentsystem.vas.service.authorization.AuthService;
import com.vetappointmentsystem.vas.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    public AuthRestController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@Valid @RequestBody UserEntity user) {
        if (userService.exists(user.getEmail()) || userService.existsPhone(user.getPhone()))
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        UserEntity saved = userService.save(user);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthDTO> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }
}
