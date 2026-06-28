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
                .route("course-service-courses", route -> route.path("/api/courses", "/api/courses/**").filters(filter -> filter.stripPrefix(1)).uri(serviceUrl("course", "http://localhost:8084")))
                .route("course-service-categories", route -> route.path("/api/categories", "/api/categories/**").filters(filter -> filter.stripPrefix(1)).uri(serviceUrl("course", "http://localhost:8084")))
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
