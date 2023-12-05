package com.vetappointmentsystem.vas.service.user;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.domain.UserRoleEnum;

import java.util.List;

public interface UserService {
    public List<UserEntity> getAllUsers();

    public UserEntity getUserById(Long id);

    public boolean exists(String email);

    public boolean existsPhone(String phone);

    public List<UserEntity> getUsersByRole(UserRoleEnum role);

    public UserEntity save(UserEntity user);
}
