package com.vetappointmentsystem.vas.service.userAuthDetails;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserAuthDetailsService extends UserDetailsService {
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;
}
