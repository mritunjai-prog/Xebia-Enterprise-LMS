package com.xebia.lms.organisation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.xebia.lms")
public class OrganisationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrganisationServiceApplication.class, args);
    }
}
