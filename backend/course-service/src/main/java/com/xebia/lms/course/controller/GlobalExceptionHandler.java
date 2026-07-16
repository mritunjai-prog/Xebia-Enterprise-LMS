package com.xebia.lms.course.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleJsonParseError(HttpMessageNotReadableException ex) {
        String message = "Invalid request body. Expected a JSON object, not an array or other format.";
        if (ex.getMostSpecificCause() != null) {
            message = "JSON parse error: " + ex.getMostSpecificCause().getMessage();
        }
        return ResponseEntity.badRequest().body(Map.of(
            "status", 400,
            "error", "Bad Request",
            "message", message
        ));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        String message = ex.getMessage() != null ? ex.getMessage() : "Invalid request";
        if (message.contains("not found") || message.contains("Not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "status", 404,
                "error", "Not Found",
                "message", message
            ));
        }
        return ResponseEntity.badRequest().body(Map.of(
            "status", 400,
            "error", "Bad Request",
            "message", message
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "status", 500,
            "error", "Internal Server Error",
            "message", "Unexpected error: " + (ex.getMessage() != null ? ex.getMessage() : "Unknown error")
        ));
    }
}
