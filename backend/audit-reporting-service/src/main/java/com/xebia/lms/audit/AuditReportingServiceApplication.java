package com.xebia.lms.audit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.xebia.lms")
public class AuditReportingServiceApplication {
    public static void main(String[] args) { SpringApplication.run(AuditReportingServiceApplication.class, args); }
}
