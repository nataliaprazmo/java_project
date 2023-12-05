package com.vetappointmentsystem.vas.repository;

import com.vetappointmentsystem.vas.domain.AppointmentEntity;
import com.vetappointmentsystem.vas.domain.AppointmentStatusEnum;
import com.vetappointmentsystem.vas.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long> {

    public List<AppointmentEntity> findByAppointmentUser(UserEntity user);

    public List<AppointmentEntity> findByAppointmentUserAndStatus(UserEntity user, AppointmentStatusEnum status);

    public boolean existsByDate(Date date);
}
