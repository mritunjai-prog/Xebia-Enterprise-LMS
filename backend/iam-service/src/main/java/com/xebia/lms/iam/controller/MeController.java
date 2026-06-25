package com.xebia.lms.iam.controller;

import com.xebia.lms.common.security.CurrentUser;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.iam.dto.EffectivePermissionsResponse;
import com.xebia.lms.iam.dto.ModuleResponse;
import com.xebia.lms.iam.service.PermissionService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
public class MeController {
    private final PermissionService permissionService;

    public MeController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    CurrentUser me() {
        return TenantContext.get();
    }

    @GetMapping("/permissions")
    EffectivePermissionsResponse permissions() {
        return permissionService.effectivePermissions();
    }

    @GetMapping("/modules")
    List<ModuleResponse> modules() {
        return permissionService.visibleModules();
    }
}
