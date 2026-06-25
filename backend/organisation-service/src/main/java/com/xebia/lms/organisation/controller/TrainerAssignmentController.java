package com.xebia.lms.organisation.controller;

import com.xebia.lms.organisation.dto.TrainerAssignmentRequest;
import com.xebia.lms.organisation.entity.TrainerAssignment;
import com.xebia.lms.organisation.service.TrainerAssignmentService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trainer-assignments")
public class TrainerAssignmentController {
    private final TrainerAssignmentService service;

    public TrainerAssignmentController(TrainerAssignmentService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    TrainerAssignment create(@Valid @RequestBody TrainerAssignmentRequest request) {
        return service.create(request);
    }

    @GetMapping
    List<TrainerAssignment> list() {
        return service.list();
    }
}
