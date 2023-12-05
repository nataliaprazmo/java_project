package com.vetappointmentsystem.vas.repository;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.domain.UserRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public List<UserEntity> findByRole(UserRoleEnum role);

    public Optional<UserEntity> findByEmail(String email);

    public boolean existsByEmail(String email);

    public boolean existsByPhone(String phone);

    public boolean existsByRole(UserRoleEnum role);
}
