package com.vetappointmentsystem.vas.service.authorization;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.dto.JwtAuthDTO;
import com.vetappointmentsystem.vas.dto.LoginDTO;

public interface AuthService {
    public JwtAuthDTO login(LoginDTO loginDTO);

    public UserEntity retrieveUser(String headerToken);
}
