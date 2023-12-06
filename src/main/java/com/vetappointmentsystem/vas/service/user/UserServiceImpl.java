package com.vetappointmentsystem.vas.service.user;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.domain.UserRoleEnum;
import com.vetappointmentsystem.vas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with id " + id + " not found"));
    }

    @Override
    public boolean exists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsAnyAdmin() {
        return userRepository.existsByRole(UserRoleEnum.ADMIN);
    }

    @Override
    public List<UserEntity> getUsersByRole(UserRoleEnum role) {
        return userRepository.findByRole(role);
    }

    @Override
    public UserEntity save(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRoleEnum.USER);
        return userRepository.save(user);
    }

    @Override
    public boolean saveAdmin(UserEntity admin) {
        if (exists(admin.getEmail()) || existsPhone(admin.getPhone()))
            return false;
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(UserRoleEnum.ADMIN);
        userRepository.save(admin);
        return true;
    }

    @Override
    public boolean deleteAdminById(Long id) {
        if (getUserById(id).getRole() != UserRoleEnum.ADMIN)
            return false;
        userRepository.deleteById(id);
        return true;
    }
}
