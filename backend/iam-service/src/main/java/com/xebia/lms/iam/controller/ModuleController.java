package com.xebia.lms.iam.controller;

import com.xebia.lms.iam.dto.ModuleResponse;
import com.xebia.lms.iam.service.PermissionService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/modules")
public class ModuleController {
    private final PermissionService permissionService;

    public ModuleController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    List<ModuleResponse> list() {
        return permissionService.listModules();
    }
}
