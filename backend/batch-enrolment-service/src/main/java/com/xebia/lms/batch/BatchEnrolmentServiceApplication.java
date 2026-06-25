package com.xebia.lms.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.xebia.lms")
public class BatchEnrolmentServiceApplication {
    public static void main(String[] args) { SpringApplication.run(BatchEnrolmentServiceApplication.class, args); }
}
