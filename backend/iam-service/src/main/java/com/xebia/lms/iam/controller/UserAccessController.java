package com.xebia.lms.iam.controller;

import com.xebia.lms.iam.dto.AssignRoleRequest;
import com.xebia.lms.iam.service.RoleService;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserAccessController {
    private final RoleService roleService;

    public UserAccessController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/{userId}/roles")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void assignRole(@PathVariable UUID userId, @Valid @RequestBody AssignRoleRequest request) {
        roleService.assignRole(userId, request);
    }
}
