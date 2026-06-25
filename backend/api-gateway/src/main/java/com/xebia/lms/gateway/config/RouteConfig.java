package com.xebia.lms.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class RouteConfig {
    private final Environment environment;

    public RouteConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    RouteLocator lmsRoutes(RouteLocatorBuilder routes) {
        return routes.routes()
                .route("iam-service", route -> route.path("/api/iam", "/api/iam/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("iam", "http://localhost:8081")))
                .route("organisation-service", route -> route.path("/api/organisations", "/api/organisations/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("organisation", "http://localhost:8082")))
                .route("user-management-service", route -> route.path("/api/users", "/api/users/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("user-management", "http://localhost:8083")))
                .route("course-service", route -> route.path("/api/courses", "/api/courses/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("course", "http://localhost:8084")))
                .route("batch-enrolment-service", route -> route.path("/api/batches", "/api/batches/**", "/api/enrolments", "/api/enrolments/**").filters(filter -> filter.stripPrefix(1)).uri(serviceUrl("batch-enrolment", "http://localhost:8085")))
                .route("approval-service", route -> route.path("/api/approvals", "/api/approvals/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("approval", "http://localhost:8086")))
                .route("notification-service", route -> route.path("/api/notifications", "/api/notifications/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("notification", "http://localhost:8087")))
                .route("assessment-service", route -> route.path("/api/assessments", "/api/assessments/**", "/api/submissions", "/api/submissions/**", "/api/results", "/api/results/**").filters(filter -> filter.stripPrefix(1)).uri(serviceUrl("assessment", "http://localhost:8088")))
                .route("media-streaming-service", route -> route.path("/api/media", "/api/media/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("media", "http://localhost:8089")))
                .route("engagement-service", route -> route.path("/api/engagement", "/api/engagement/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("engagement", "http://localhost:8090")))
                .route("document-service", route -> route.path("/api/documents", "/api/documents/**").filters(filter -> filter.stripPrefix(2)).uri(serviceUrl("document", "http://localhost:8091")))
                .route("audit-reporting-service", route -> route.path("/api/audit-logs", "/api/audit-logs/**", "/api/reports", "/api/reports/**").filters(filter -> filter.stripPrefix(1)).uri(serviceUrl("audit-reporting", "http://localhost:8092")))
                .build();
    }

    private String serviceUrl(String key, String fallback) {
        String propertyValue = environment.getProperty("services." + key);
        if (propertyValue != null && !propertyValue.isBlank()) {
            return propertyValue;
        }
        String envKey = "SERVICES_" + key.toUpperCase().replace("-", "_");
        String envValue = System.getenv(envKey);
        return envValue == null || envValue.isBlank() ? fallback : envValue;
    }
}
