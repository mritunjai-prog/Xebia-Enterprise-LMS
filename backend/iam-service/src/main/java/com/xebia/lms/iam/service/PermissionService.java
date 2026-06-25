package com.xebia.lms.iam.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.iam.dto.EffectivePermissionsResponse;
import com.xebia.lms.iam.dto.ModuleResponse;
import com.xebia.lms.iam.dto.PermissionRequest;
import com.xebia.lms.iam.dto.PermissionResponse;
import com.xebia.lms.iam.entity.LmsModule;
import com.xebia.lms.iam.entity.Permission;
import com.xebia.lms.iam.entity.RoleModule;
import com.xebia.lms.iam.entity.RolePermission;
import com.xebia.lms.iam.entity.UserRole;
import com.xebia.lms.iam.repository.LmsModuleRepository;
import com.xebia.lms.iam.repository.PermissionRepository;
import com.xebia.lms.iam.repository.RoleModuleRepository;
import com.xebia.lms.iam.repository.RolePermissionRepository;
import com.xebia.lms.iam.repository.UserRoleRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PermissionService {
    private final UserRoleRepository userRoles;
    private final RolePermissionRepository rolePermissions;
    private final RoleModuleRepository roleModules;
    private final PermissionRepository permissions;
    private final LmsModuleRepository modules;
    private final PermissionCacheService cacheService;

    public PermissionService(UserRoleRepository userRoles, RolePermissionRepository rolePermissions, RoleModuleRepository roleModules,
                             PermissionRepository permissions, LmsModuleRepository modules, PermissionCacheService cacheService) {
        this.userRoles = userRoles;
        this.rolePermissions = rolePermissions;
        this.roleModules = roleModules;
        this.permissions = permissions;
        this.modules = modules;
        this.cacheService = cacheService;
    }

    @Cacheable(value = "effective-permissions", key = "T(com.xebia.lms.common.security.TenantContext).userId()")
    public EffectivePermissionsResponse effectivePermissions() {
        List<String> permissionCodes = userRoles.findByUserIdAndTenantId(TenantContext.userId(), TenantContext.tenantId()).stream()
                .map(UserRole::getRoleId)
                .flatMap(roleId -> rolePermissions.findByRoleId(roleId).stream())
                .map(RolePermission::getPermissionId)
                .map(permissionId -> permissions.findById(permissionId).map(Permission::getCode).orElse(null))
                .filter(code -> code != null)
                .distinct()
                .sorted(Comparator.naturalOrder())
                .toList();
        List<String> moduleCodes = visibleModules().stream().map(ModuleResponse::code).toList();
        return new EffectivePermissionsResponse(permissionCodes, moduleCodes);
    }

    public List<PermissionResponse> listPermissions() {
        return permissions.findAll().stream()
                .map(permission -> new PermissionResponse(permission.getId(), permission.getCode(), permission.getDescription()))
                .toList();
    }

    @Transactional
    public PermissionResponse createPermission(PermissionRequest request) {
        if (permissions.findByCode(request.code().toUpperCase()).isPresent()) {
            throw new BusinessException(HttpStatus.CONFLICT, "Permission code already exists");
        }
        Permission permission = new Permission();
        permission.setCode(request.code().toUpperCase());
        permission.setDescription(request.description());
        Permission saved = permissions.save(permission);
        cacheService.invalidateEffectivePermissions();
        return new PermissionResponse(saved.getId(), saved.getCode(), saved.getDescription());
    }

    public List<ModuleResponse> listModules() {
        return modules.findAll().stream()
                .map(this::toModuleResponse)
                .toList();
    }

    public List<ModuleResponse> visibleModules() {
        return userRoles.findByUserIdAndTenantId(TenantContext.userId(), TenantContext.tenantId()).stream()
                .map(UserRole::getRoleId)
                .flatMap(roleId -> roleModules.findByRoleId(roleId).stream())
                .map(RoleModule::getModuleId)
                .map(moduleId -> modules.findById(moduleId).orElse(null))
                .filter(module -> module != null)
                .map(this::toModuleResponse)
                .distinct()
                .sorted(Comparator.comparing(ModuleResponse::code))
                .toList();
    }

    private ModuleResponse toModuleResponse(LmsModule module) {
        return new ModuleResponse(module.getId(), module.getCode(), module.getDisplayName(), module.getRoute());
    }
}
