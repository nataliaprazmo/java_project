package com.vetappointmentsystem.vas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "appUser")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "First name cannot be null")
    @Size(max = 50, message = "First name should not be more than 50 characters")
    private String firstName;

    @NotNull(message = "Last name cannot be null")
    @Size(max = 50, message = "Last name should not be more than 50 characters")
    private String lastName;

    @Column(unique = true)
    @NotNull(message = "Email cannot be null")
    @Size(max = 100, message = "Email should not be more than 100 characters")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 20, message = "Password should be between 8 and 20 characters")
    private String password;

    @Column(unique = true)
    @NotNull(message = "Phone cannot be null")
    @Size(min = 9, max = 12, message = "Phone should not be more than 15 characters")
    private String phone;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role cannot be null")
    private UserRoleEnum role;

    @JsonIgnore
    @OneToMany(mappedBy = "appointmentUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AppointmentEntity> appointments;

    public UserEntity(String firstName, String lastName, String email, String password, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public UserEntity(String firstName, String lastName, String email, String password, String phone, UserRoleEnum role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }
}