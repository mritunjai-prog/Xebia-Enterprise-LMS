package com.xebia.lms.assessment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.xebia.lms")
public class AssessmentServiceApplication {
    public static void main(String[] args) { SpringApplication.run(AssessmentServiceApplication.class, args); }
}
