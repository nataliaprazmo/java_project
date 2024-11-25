package com.vetappointmentsystem.vas.controller;

import com.vetappointmentsystem.vas.domain.AppointmentEntity;
import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.domain.UserRoleEnum;
import com.vetappointmentsystem.vas.service.appointment.AppointmentService;
import com.vetappointmentsystem.vas.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminRestController {
    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;

    public AdminRestController(UserService userService, AppointmentService appointmentService) {
        this.userService = userService;
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<String> adminPage() {
        return ResponseEntity.ok("Admin page");
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getUsers() {
        return ResponseEntity.ok(userService.getUsersByRole(UserRoleEnum.USER));
    }

    @GetMapping("/admins")
    public ResponseEntity<List<UserEntity>> getAdmins() {
        return ResponseEntity.ok(userService.getUsersByRole(UserRoleEnum.ADMIN));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentEntity>> getAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/appointment/{id}")
    public ResponseEntity<AppointmentEntity> getAppointmentDetails(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @PutMapping("/appointment/{id}/updateStatus")
    public ResponseEntity<String> updateAppointmentAsCompleted(@PathVariable Long id) {
        boolean updateStatus = appointmentService.updateStatus(id);
        if (!updateStatus)
            return new ResponseEntity<>("Appointment status can't be updated", HttpStatus.CONFLICT);
        return ResponseEntity.ok("Appointment status updated");
    }

    @PostMapping("/add")
    public ResponseEntity<UserEntity> addAdmin(@Valid @RequestBody UserEntity newAdmin) {
        boolean createStatus = userService.saveAdmin(newAdmin);
        if (!createStatus)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    }

    @DeleteMapping("/admins/delete/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        boolean deleteStatus = userService.deleteAdminById(id);
        if (!deleteStatus)
            return new ResponseEntity<>("Deletion failed", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok("Admin deleted");
    }
}