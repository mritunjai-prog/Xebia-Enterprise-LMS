package com.xebia.lms.iam.controller;

import com.xebia.lms.iam.dto.AssignModuleRequest;
import com.xebia.lms.iam.dto.AssignPermissionRequest;
import com.xebia.lms.iam.dto.AssignRoleRequest;
import com.xebia.lms.iam.dto.RoleRequest;
import com.xebia.lms.iam.dto.RoleResponse;
import com.xebia.lms.iam.service.RoleService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    List<RoleResponse> list() {
        return roleService.listRoles();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    RoleResponse create(@Valid @RequestBody RoleRequest request) {
        return roleService.create(request);
    }

    @DeleteMapping("/{roleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable UUID roleId) {
        roleService.delete(roleId);
    }

    @PostMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void assignRole(@PathVariable UUID userId, @Valid @RequestBody AssignRoleRequest request) {
        roleService.assignRole(userId, request);
    }

    @PostMapping("/{roleId}/permissions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void assignPermission(@PathVariable UUID roleId, @Valid @RequestBody AssignPermissionRequest request) {
        roleService.assignPermission(roleId, request);
    }

    @PostMapping("/{roleId}/modules")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void assignModule(@PathVariable UUID roleId, @Valid @RequestBody AssignModuleRequest request) {
        roleService.assignModule(roleId, request);
    }
}
