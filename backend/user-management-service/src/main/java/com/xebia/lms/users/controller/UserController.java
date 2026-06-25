package com.xebia.lms.users.controller;

import com.xebia.lms.users.dto.CreateUserRequest;
import com.xebia.lms.users.dto.UserResponse;
import com.xebia.lms.users.service.UserProvisioningService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {
    private final UserProvisioningService service;
    public UserController(UserProvisioningService service) { this.service = service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse create(@Valid @RequestBody CreateUserRequest request) { return service.create(request); }

    @PostMapping("/managers")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse manager(@Valid @RequestBody CreateUserRequest request) { return service.create(new CreateUserRequest(request.iamUserId(), request.email(), request.fullName(), com.xebia.lms.users.entity.UserType.MANAGER, request.primarySubject(), request.universityId())); }

    @PostMapping("/trainers")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse trainer(@Valid @RequestBody CreateUserRequest request) { return service.create(new CreateUserRequest(request.iamUserId(), request.email(), request.fullName(), com.xebia.lms.users.entity.UserType.TRAINER, request.primarySubject(), request.universityId())); }

    @PostMapping("/organisers")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse organiser(@Valid @RequestBody CreateUserRequest request) { return service.create(new CreateUserRequest(request.iamUserId(), request.email(), request.fullName(), com.xebia.lms.users.entity.UserType.ORGANISER, request.primarySubject(), request.universityId())); }

    @PostMapping("/students")
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse student(@Valid @RequestBody CreateUserRequest request) { return service.create(new CreateUserRequest(request.iamUserId(), request.email(), request.fullName(), com.xebia.lms.users.entity.UserType.STUDENT, request.primarySubject(), request.universityId())); }

    @GetMapping
    List<UserResponse> list() { return service.list(); }

    @PatchMapping("/{id}/activate")
    UserResponse activate(@PathVariable UUID id) { return service.setActive(id, true); }

    @PatchMapping("/{id}/deactivate")
    UserResponse deactivate(@PathVariable UUID id) { return service.setActive(id, false); }
}
