package com.vetappointmentsystem.vas.service.appointment;

import com.vetappointmentsystem.vas.domain.AppointmentEntity;
import com.vetappointmentsystem.vas.domain.AppointmentStatusEnum;
import com.vetappointmentsystem.vas.domain.UserEntity;

import java.util.Date;
import java.util.List;

public interface AppointmentService {
    public List<AppointmentEntity> getAllAppointments();

    public AppointmentEntity getAppointmentById(Long id);

    public List<AppointmentEntity> getAppointmentsByUser(UserEntity user);

    public List<AppointmentEntity> getUserAppointmentsByStatus(UserEntity user, AppointmentStatusEnum status);

    public boolean existsOnDate(Date date);

    public AppointmentEntity save(AppointmentEntity appointment);

    public boolean deleteById(Long id);

    public boolean update(Long id, AppointmentEntity appointment);

    public AppointmentEntity updateStatus(Long id);
}
