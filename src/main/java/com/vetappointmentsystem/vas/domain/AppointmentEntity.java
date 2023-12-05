package com.vetappointmentsystem.vas.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'RESERVED'")
    private AppointmentStatusEnum status;

    private Date date;

    @Lob
    private String details;

    private String petName;
}
