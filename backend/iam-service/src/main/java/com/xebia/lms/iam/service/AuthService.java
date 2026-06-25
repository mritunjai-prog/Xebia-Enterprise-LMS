package com.xebia.lms.iam.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.JwtService;
import com.xebia.lms.iam.dto.LoginRequest;
import com.xebia.lms.iam.dto.LoginResponse;
import com.xebia.lms.iam.entity.AppUser;
import com.xebia.lms.iam.entity.Role;
import com.xebia.lms.iam.entity.UserRole;
import com.xebia.lms.iam.entity.UserStatus;
import com.xebia.lms.iam.repository.AppUserRepository;
import com.xebia.lms.iam.repository.RoleRepository;
import com.xebia.lms.iam.repository.UserRoleRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AppUserRepository users;
    private final UserRoleRepository userRoles;
    private final RoleRepository roles;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AppUserRepository users, UserRoleRepository userRoles, RoleRepository roles, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.users = users;
        this.userRoles = userRoles;
        this.roles = roles;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        AppUser user = users.findByEmail(request.email())
                .filter(found -> found.getTenantId().equals(request.tenantId()))
                .orElseThrow(() -> new BusinessException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (user.getStatus() != UserStatus.ACTIVE || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        List<String> roleCodes = userRoles.findByUserIdAndTenantId(user.getId(), request.tenantId()).stream()
                .map(UserRole::getRoleId)
                .map(roleId -> roles.findById(roleId).map(Role::getCode).orElse(null))
                .filter(code -> code != null)
                .toList();
        String token = jwtService.issueToken(user.getId(), user.getTenantId(), user.getEmail(), roleCodes);
        return new LoginResponse(token, user.getId(), user.getTenantId(), user.getEmail(), roleCodes);
    }
}
