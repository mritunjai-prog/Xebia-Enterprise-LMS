package com.xebia.lms.iam.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.iam.dto.AssignModuleRequest;
import com.xebia.lms.iam.dto.AssignPermissionRequest;
import com.xebia.lms.iam.dto.AssignRoleRequest;
import com.xebia.lms.iam.dto.RoleRequest;
import com.xebia.lms.iam.dto.RoleResponse;
import com.xebia.lms.iam.entity.Role;
import com.xebia.lms.iam.entity.RoleModule;
import com.xebia.lms.iam.entity.RolePermission;
import com.xebia.lms.iam.entity.UserRole;
import com.xebia.lms.iam.event.IamEventPublisher;
import com.xebia.lms.iam.mapper.IamMapper;
import com.xebia.lms.iam.repository.LmsModuleRepository;
import com.xebia.lms.iam.repository.PermissionRepository;
import com.xebia.lms.iam.repository.RoleModuleRepository;
import com.xebia.lms.iam.repository.RolePermissionRepository;
import com.xebia.lms.iam.repository.RoleRepository;
import com.xebia.lms.iam.repository.UserRoleRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService {
    private final RoleRepository roles;
    private final UserRoleRepository userRoles;
    private final PermissionRepository permissions;
    private final RolePermissionRepository rolePermissions;
    private final LmsModuleRepository modules;
    private final RoleModuleRepository roleModules;
    private final IamEventPublisher publisher;
    private final PermissionCacheService cacheService;

    public RoleService(RoleRepository roles, UserRoleRepository userRoles, PermissionRepository permissions,
                       RolePermissionRepository rolePermissions, LmsModuleRepository modules, RoleModuleRepository roleModules,
                       IamEventPublisher publisher, PermissionCacheService cacheService) {
        this.roles = roles;
        this.userRoles = userRoles;
        this.permissions = permissions;
        this.rolePermissions = rolePermissions;
        this.modules = modules;
        this.roleModules = roleModules;
        this.publisher = publisher;
        this.cacheService = cacheService;
    }

    public List<RoleResponse> listRoles() {
        return roles.findAll().stream().map(IamMapper::toRoleResponse).toList();
    }

    @Transactional
    public RoleResponse create(RoleRequest request) {
        String roleCode = request.code().toUpperCase();
        if (roles.existsByCode(roleCode)) {
            throw new BusinessException(HttpStatus.CONFLICT, "Role code already exists");
        }
        Role role = new Role();
        role.setCode(roleCode);
        role.setName(request.name());
        Role saved = roles.save(role);
        cacheService.invalidateEffectivePermissions();
        publisher.roleChanged(TenantContext.tenantId(), TenantContext.userId(), saved.getId());
        return IamMapper.toRoleResponse(saved);
    }

    @Transactional
    public void delete(UUID roleId) {
        Role role = roles.findById(roleId).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Role not found"));
        if (role.isSystemRole()) {
            throw new BusinessException(HttpStatus.CONFLICT, "System roles cannot be deleted");
        }
        roles.delete(role);
        cacheService.invalidateEffectivePermissions();
        publisher.roleChanged(TenantContext.tenantId(), TenantContext.userId(), roleId);
    }

    @Transactional
    public void assignRole(UUID userId, AssignRoleRequest request) {
        roles.findById(request.roleId()).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Role not found"));
        UserRole assignment = new UserRole();
        assignment.setUserId(userId);
        assignment.setRoleId(request.roleId());
        assignment.setTenantId(TenantContext.tenantId());
        assignment.setScopeId(request.scopeId());
        userRoles.save(assignment);
        cacheService.invalidateEffectivePermissions();
    }

    @Transactional
    public void assignPermission(UUID roleId, AssignPermissionRequest request) {
        roles.findById(roleId).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Role not found"));
        permissions.findById(request.permissionId()).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Permission not found"));
        boolean exists = rolePermissions.findByRoleId(roleId).stream().anyMatch(item -> item.getPermissionId().equals(request.permissionId()));
        if (!exists) {
            RolePermission rolePermission = new RolePermission();
            rolePermission.setRoleId(roleId);
            rolePermission.setPermissionId(request.permissionId());
            rolePermissions.save(rolePermission);
        }
        cacheService.invalidateEffectivePermissions();
        publisher.roleChanged(TenantContext.tenantId(), TenantContext.userId(), roleId);
    }

    @Transactional
    public void assignModule(UUID roleId, AssignModuleRequest request) {
        roles.findById(roleId).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Role not found"));
        modules.findById(request.moduleId()).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Module not found"));
        boolean exists = roleModules.findByRoleId(roleId).stream().anyMatch(item -> item.getModuleId().equals(request.moduleId()));
        if (!exists) {
            RoleModule roleModule = new RoleModule();
            roleModule.setRoleId(roleId);
            roleModule.setModuleId(request.moduleId());
            roleModules.save(roleModule);
        }
        cacheService.invalidateEffectivePermissions();
        publisher.roleChanged(TenantContext.tenantId(), TenantContext.userId(), roleId);
    }
}
