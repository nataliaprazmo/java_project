package com.vetappointmentsystem.vas.dto;

import lombok.Data;

@Data
public class JwtAuthDTO {
    private String token;
    private String role;
}
