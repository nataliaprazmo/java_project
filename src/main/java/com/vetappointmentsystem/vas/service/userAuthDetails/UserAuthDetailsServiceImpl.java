package com.vetappointmentsystem.vas.service.userAuthDetails;

import com.vetappointmentsystem.vas.domain.UserAuthDetails;
import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserAuthDetailsServiceImpl implements UserAuthDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserAuthDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with email " + email + " not found"));
        return new UserAuthDetails(user);
    }
}
