package com.vetappointmentsystem.vas.service.appointment;

import com.vetappointmentsystem.vas.domain.AppointmentEntity;
import com.vetappointmentsystem.vas.domain.AppointmentStatusEnum;
import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public AppointmentEntity getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Appointment with id " + id + " not found"));
    }

    @Override
    public List<AppointmentEntity> getAppointmentsByUser(UserEntity user) {
        return appointmentRepository.findByAppointmentUser(user);
    }

    @Override
    public List<AppointmentEntity> getUserAppointmentsByStatus(UserEntity user, AppointmentStatusEnum status) {
        return appointmentRepository.findByAppointmentUserAndStatus(user, status);
    }

    @Override
    public boolean existsOnDate(Date date) {
        return appointmentRepository.existsByDate(date);
    }

    @Override
    public boolean isBeforeToday(AppointmentEntity appointment) {
        Date currentDate = new Date();
        return appointment.getDate().before(currentDate);
    }

    @Override
    public boolean save(AppointmentEntity appointment) {
        appointment.setStatus(AppointmentStatusEnum.RESERVED);
        if (isBeforeToday(appointment) || existsOnDate(appointment.getDate())) return false;
        appointmentRepository.save(appointment);
        return true;
    }

    @Override
    public boolean deleteById(Long id) {
        if (getAppointmentById(id) == null) return false;
        appointmentRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean update(Long id, AppointmentEntity appointment) {
        AppointmentEntity appointmentEntity = getAppointmentById(id);
        if (appointmentEntity == null)
            return false;
        if (isBeforeToday(appointment) || appointment.getStatus() == AppointmentStatusEnum.COMPLETED)
            return false;
        appointmentEntity.setDate(appointment.getDate());
        appointmentEntity.setDetails(appointment.getDetails());
        appointmentEntity.setPetName(appointment.getPetName());
        appointmentRepository.save(appointment);
        return true;
    }

    @Override
    public boolean updateStatus(Long id) {
        AppointmentEntity appointment = getAppointmentById(id);
        if (!isBeforeToday(appointment) || appointment.getStatus() == AppointmentStatusEnum.COMPLETED)
            return false;
        appointment.setStatus(AppointmentStatusEnum.COMPLETED);
        appointmentRepository.save(appointment);
        return true;
    }
}
