package com.xebia.lms.iam.mapper;

import com.xebia.lms.iam.dto.RoleResponse;
import com.xebia.lms.iam.entity.Role;

public class IamMapper {
    private IamMapper() {
    }

    public static RoleResponse toRoleResponse(Role role) {
        return new RoleResponse(role.getId(), role.getCode(), role.getName(), role.isSystemRole(), role.isActive());
    }
}
