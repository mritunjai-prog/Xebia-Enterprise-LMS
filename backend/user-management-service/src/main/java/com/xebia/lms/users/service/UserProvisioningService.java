package com.xebia.lms.users.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.users.dto.CreateUserRequest;
import com.xebia.lms.users.dto.UserResponse;
import com.xebia.lms.users.entity.ManagedUser;
import com.xebia.lms.users.entity.StudentProfile;
import com.xebia.lms.users.entity.TrainerProfile;
import com.xebia.lms.users.entity.UserType;
import com.xebia.lms.users.event.UserEventPublisher;
import com.xebia.lms.users.mapper.UserMapper;
import com.xebia.lms.users.repository.ManagedUserRepository;
import com.xebia.lms.users.repository.StudentProfileRepository;
import com.xebia.lms.users.repository.TrainerProfileRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProvisioningService {
    private final ManagedUserRepository users;
    private final TrainerProfileRepository trainers;
    private final StudentProfileRepository students;
    private final PermissionGuard guard;
    private final UserEventPublisher publisher;

    public UserProvisioningService(ManagedUserRepository users, TrainerProfileRepository trainers, StudentProfileRepository students, PermissionGuard guard, UserEventPublisher publisher) {
        this.users = users;
        this.trainers = trainers;
        this.students = students;
        this.guard = guard;
        this.publisher = publisher;
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        guard.requireTenant();
        if (request.userType() == UserType.MANAGER && !TenantContext.roles().contains("ADMIN")) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "Only Admin can create Manager");
        }
        ManagedUser user = new ManagedUser();
        user.setTenantId(TenantContext.tenantId());
        user.setIamUserId(request.iamUserId());
        user.setEmail(request.email());
        user.setFullName(request.fullName());
        user.setUserType(request.userType());
        ManagedUser saved = users.save(user);
        if (request.userType() == UserType.TRAINER) {
            TrainerProfile profile = new TrainerProfile();
            profile.setTenantId(TenantContext.tenantId());
            profile.setManagedUserId(saved.getId());
            profile.setPrimarySubject(request.primarySubject());
            trainers.save(profile);
        }
        if (request.userType() == UserType.STUDENT) {
            StudentProfile profile = new StudentProfile();
            profile.setTenantId(TenantContext.tenantId());
            profile.setManagedUserId(saved.getId());
            profile.setUniversityId(request.universityId());
            students.save(profile);
        }
        publisher.userCreated(saved);
        return UserMapper.response(saved);
    }

    public List<UserResponse> list() {
        guard.requireTenant();
        return users.findByTenantId(TenantContext.tenantId()).stream().map(UserMapper::response).toList();
    }

    @Transactional
    public UserResponse setActive(UUID id, boolean active) {
        ManagedUser user = users.findById(id)
                .filter(found -> found.getTenantId().equals(TenantContext.tenantId()))
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "User not found"));
        user.setActive(active);
        return UserMapper.response(users.save(user));
    }
}
