package com.vetappointmentsystem.vas.controller;

import com.vetappointmentsystem.vas.domain.AppointmentEntity;
import com.vetappointmentsystem.vas.domain.AppointmentStatusEnum;
import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.service.appointment.AppointmentService;
import com.vetappointmentsystem.vas.service.authorization.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserRestController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AuthService authService;

    public UserRestController(AppointmentService appointmentService, AuthService authService) {
        this.appointmentService = appointmentService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<String> getUserPage() {
        return ResponseEntity.ok("User page");
    }

    @GetMapping("/details")
    public ResponseEntity<UserEntity> getUserDetails(@RequestHeader("Authorization") String headerToken) {
        return ResponseEntity.ok(authService.retrieveUser(headerToken));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentEntity>> getUserAppointments(@RequestHeader("Authorization") String headerToken,
                                                                       @RequestParam(required = false) String status) {
        UserEntity user = authService.retrieveUser(headerToken);
        AppointmentStatusEnum appointmentStatus;
        if (status != null) {
            try {
                appointmentStatus = AppointmentStatusEnum.valueOf(status);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(appointmentService.getUserAppointmentsByStatus(user, appointmentStatus));
        }
        return ResponseEntity.ok(appointmentService.getAppointmentsByUser(user));
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<AppointmentEntity> getAppointmentDetails(@PathVariable Long id) {
        AppointmentEntity appointment = appointmentService.getAppointmentById(id);
        if (appointment == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentEntity> createAppointment(@RequestHeader("Authorization") String headerToken,
                                                               @Valid @RequestBody AppointmentEntity appointment) {
        UserEntity user = authService.retrieveUser(headerToken);
        appointment.setAppointmentUser(user);
        boolean createStatus = appointmentService.save(appointment);
        if (!createStatus)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }

    @PutMapping("/appointments/{id}")
    public ResponseEntity<String> updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentEntity appointment) {
        boolean updateStatus = appointmentService.update(id, appointment);
        if (!updateStatus)
            return new ResponseEntity<>("Date reserved or such appointment doesn't exist", HttpStatus.CONFLICT);
        return ResponseEntity.ok("Appointment updated");
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        boolean deleteStatus = appointmentService.deleteById(id);
        if (!deleteStatus) return new ResponseEntity<>("Appointment doesn't exist", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok("Appointment deleted");
    }
}
