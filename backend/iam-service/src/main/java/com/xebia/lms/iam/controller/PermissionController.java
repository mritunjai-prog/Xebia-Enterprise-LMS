package com.xebia.lms.iam.controller;

import com.xebia.lms.iam.dto.PermissionRequest;
import com.xebia.lms.iam.dto.PermissionResponse;
import com.xebia.lms.iam.service.PermissionService;
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
@RequestMapping("/permissions")
public class PermissionController {
    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    List<PermissionResponse> list() {
        return permissionService.listPermissions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    PermissionResponse create(@Valid @RequestBody PermissionRequest request) {
        return permissionService.createPermission(request);
    }
}
