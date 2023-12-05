package com.vetappointmentsystem.vas;

import com.vetappointmentsystem.vas.domain.UserEntity;
import com.vetappointmentsystem.vas.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VasApplication implements CommandLineRunner {
    @Autowired
    private UserService userService;

    public VasApplication(UserService userService) {
        this.userService = userService;
    }

    public static void main(String[] args) {
        SpringApplication.run(VasApplication.class, args);
    }

    public void run(String... args) {
        if (!userService.existsAnyAdmin()) {
            userService.saveAdmin(new UserEntity("Admin", "Adminski", "admin@admin.com", "P@ssw0rd", "000000000"));
            System.out.println("utworzono admina");
        }
    }

}
