package com.vetappointmentsystem.vas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointment")
public class AppointmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "appointmentUser_id")
    @NotNull(message = "Appointment user cannot be null")
    private UserEntity appointmentUser;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'RESERVED'")
    @NotNull(message = "Status cannot be null")
    private AppointmentStatusEnum status;

    @NotNull(message = "Date cannot be null")
    private Date date;

    @Lob
    @NotNull(message = "Details cannot be null")
    @Size(max = 500, message = "Details should not be more than 500 characters")
    private String details;

    @NotNull(message = "Pet name cannot be null")
    @Size(max = 50, message = "Pet name should not be more than 50 characters")
    private String petName;

    public AppointmentEntity(Date date, String details, String petName) {
        this.date = date;
        this.details = details;
        this.petName = petName;
    }
}
