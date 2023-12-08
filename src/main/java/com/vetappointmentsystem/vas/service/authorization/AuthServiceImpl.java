package com.vetappointmentsystem.vas.service.authorization;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.dto.JwtAuthDTO;
import com.vetappointmentsystem.vas.dto.LoginDTO;
import com.vetappointmentsystem.vas.repository.UserRepository;
import com.vetappointmentsystem.vas.service.jwt.JwtService;
import com.vetappointmentsystem.vas.service.userAuthDetails.UserAuthDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserAuthDetailsService userAuthDetailsService;

    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager, JwtService jwtService, UserAuthDetailsService userAuthDetailsService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userAuthDetailsService = userAuthDetailsService;
    }

    @Override
    public JwtAuthDTO login(LoginDTO loginDTO) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),
                loginDTO.getPassword()));
        var user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        var userDetails = userAuthDetailsService.loadUserByUsername(user.getEmail());
        var jwt = jwtService.generateToken(userDetails);
        JwtAuthDTO jwtAuthDTO = new JwtAuthDTO();
        jwtAuthDTO.setToken(jwt);
        jwtAuthDTO.setRole(user.getRole().name());
        return jwtAuthDTO;
    }

    @Override
    public UserEntity retrieveUser(String headerToken) {
        String token = headerToken.substring(7);
        String userEmail = jwtService.extractUsername(token);
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + userEmail + " not found"));
        return user;
    }
}
