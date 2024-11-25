package com.vetappointmentsystem.vas.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Size(min = 6, message = "Password should have at least 6 characters")
    private String password;

    @Column(unique = true)
    @NotNull(message = "Phone cannot be null")
    @Pattern(regexp = "^[0-9]{9,12}$", message = "Phone number must be between 9 and 12 digits")
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
