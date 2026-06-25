package com.xebia.lms.approval;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.xebia.lms")
public class ApprovalServiceApplication {
    public static void main(String[] args) { SpringApplication.run(ApprovalServiceApplication.class, args); }
}
