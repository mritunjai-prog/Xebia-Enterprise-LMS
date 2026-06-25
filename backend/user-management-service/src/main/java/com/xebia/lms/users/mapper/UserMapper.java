package com.xebia.lms.users.mapper;

import com.xebia.lms.users.dto.UserResponse;
import com.xebia.lms.users.entity.ManagedUser;

public class UserMapper {
    private UserMapper() {}
    public static UserResponse response(ManagedUser user) {
        return new UserResponse(user.getId(), user.getTenantId(), user.getIamUserId(), user.getEmail(), user.getFullName(), user.getUserType(), user.isActive());
    }
}
