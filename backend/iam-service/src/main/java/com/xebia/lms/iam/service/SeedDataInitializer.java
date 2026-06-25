package com.xebia.lms.iam.service;

import com.xebia.lms.iam.entity.AppUser;
import com.xebia.lms.iam.entity.LmsModule;
import com.xebia.lms.iam.entity.Permission;
import com.xebia.lms.iam.entity.Role;
import com.xebia.lms.iam.entity.RoleModule;
import com.xebia.lms.iam.entity.RolePermission;
import com.xebia.lms.iam.entity.UserRole;
import com.xebia.lms.iam.repository.AppUserRepository;
import com.xebia.lms.iam.repository.LmsModuleRepository;
import com.xebia.lms.iam.repository.PermissionRepository;
import com.xebia.lms.iam.repository.RolePermissionRepository;
import com.xebia.lms.iam.repository.RoleModuleRepository;
import com.xebia.lms.iam.repository.RoleRepository;
import com.xebia.lms.iam.repository.UserRoleRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SeedDataInitializer implements CommandLineRunner {
    public static final UUID DEFAULT_TENANT_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private final RoleRepository roles;
    private final PermissionRepository permissions;
    private final LmsModuleRepository modules;
    private final AppUserRepository users;
    private final UserRoleRepository userRoles;
    private final RolePermissionRepository rolePermissions;
    private final RoleModuleRepository roleModules;
    private final PasswordEncoder passwordEncoder;
    private final String adminPassword;

    public SeedDataInitializer(RoleRepository roles, PermissionRepository permissions, LmsModuleRepository modules, AppUserRepository users,
                               UserRoleRepository userRoles, RolePermissionRepository rolePermissions, RoleModuleRepository roleModules, PasswordEncoder passwordEncoder,
                               @Value("${lms.seed.admin-password:AdminChangeMe123!}") String adminPassword) {
        this.roles = roles;
        this.permissions = permissions;
        this.modules = modules;
        this.users = users;
        this.userRoles = userRoles;
        this.rolePermissions = rolePermissions;
        this.roleModules = roleModules;
        this.passwordEncoder = passwordEncoder;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(String... args) {
        Role admin = ensureRole("ADMIN", "Admin", true);
        ensureRole("MANAGER", "Manager", false);
        ensureRole("TRAINER", "Trainer", false);
        ensureRole("ORGANISER", "Organiser", false);
        ensureRole("STUDENT", "Student", false);

        List<Permission> seededPermissions = List.of(
                ensurePermission("IAM_MANAGE", "Manage roles, permissions and modules"),
                ensurePermission("ORG_MANAGE", "Manage organisations and universities"),
                ensurePermission("USER_MANAGE", "Create and manage users"),
                ensurePermission("COURSE_MANAGE", "Create courses and content"),
                ensurePermission("BATCH_MANAGE", "Create batches and enrolments"),
                ensurePermission("APPROVAL_DECIDE", "Approve or reject governed actions"),
                ensurePermission("NOTIFICATION_SEND", "Create notification requests"),
                ensurePermission("REPORT_VIEW", "View reports")
        );
        seededPermissions.forEach(permission -> ensureRolePermission(admin, permission));

        List<LmsModule> seededModules = List.of(
                ensureModule("IAM", "Iam"),
                ensureModule("ORGANISATION", "Organisation"),
                ensureModule("USERS", "Users"),
                ensureModule("COURSES", "Courses"),
                ensureModule("BATCHES", "Batches"),
                ensureModule("APPROVALS", "Approvals"),
                ensureModule("NOTIFICATIONS", "Notifications"),
                ensureModule("ASSESSMENTS", "Assessments"),
                ensureModule("MEDIA", "Media"),
                ensureModule("ENGAGEMENT", "Engagement"),
                ensureModule("DOCUMENTS", "Documents"),
                ensureModule("REPORTS", "Reports")
        );
        seededModules.forEach(module -> ensureRoleModule(admin, module));

        AppUser adminUser = users.findByEmail("admin@lms.local").orElseGet(() -> {
            AppUser user = new AppUser();
            user.setTenantId(DEFAULT_TENANT_ID);
            user.setEmail("admin@lms.local");
            user.setPasswordHash(passwordEncoder.encode(adminPassword));
            return users.save(user);
        });

        if (userRoles.findByUserIdAndTenantId(adminUser.getId(), DEFAULT_TENANT_ID).isEmpty()) {
            UserRole assignment = new UserRole();
            assignment.setTenantId(DEFAULT_TENANT_ID);
            assignment.setUserId(adminUser.getId());
            assignment.setRoleId(admin.getId());
            userRoles.save(assignment);
        }
    }

    private Role ensureRole(String code, String name, boolean system) {
        return roles.findByCode(code).orElseGet(() -> {
            Role role = new Role();
            role.setCode(code);
            role.setName(name);
            role.setSystemRole(system);
            return roles.save(role);
        });
    }

    private Permission ensurePermission(String code, String description) {
        return permissions.findByCode(code).orElseGet(() -> {
            Permission permission = new Permission();
            permission.setCode(code);
            permission.setDescription(description);
            return permissions.save(permission);
        });
    }

    private void ensureRolePermission(Role role, Permission permission) {
        boolean exists = rolePermissions.findByRoleId(role.getId()).stream().anyMatch(item -> item.getPermissionId().equals(permission.getId()));
        if (!exists) {
            RolePermission rolePermission = new RolePermission();
            rolePermission.setRoleId(role.getId());
            rolePermission.setPermissionId(permission.getId());
            rolePermissions.save(rolePermission);
        }
    }

    private LmsModule ensureModule(String code, String displayName) {
        return modules.findByCode(code).orElseGet(() -> {
            LmsModule module = new LmsModule();
            module.setCode(code);
            module.setDisplayName(displayName);
            module.setRoute("/" + code.toLowerCase());
            return modules.save(module);
        });
    }

    private void ensureRoleModule(Role role, LmsModule module) {
        boolean exists = roleModules.findByRoleId(role.getId()).stream().anyMatch(item -> item.getModuleId().equals(module.getId()));
        if (!exists) {
            RoleModule roleModule = new RoleModule();
            roleModule.setRoleId(role.getId());
            roleModule.setModuleId(module.getId());
            roleModules.save(roleModule);
        }
    }
}
