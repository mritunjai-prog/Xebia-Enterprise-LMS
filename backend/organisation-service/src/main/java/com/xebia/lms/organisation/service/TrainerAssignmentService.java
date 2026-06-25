package com.xebia.lms.organisation.service;

import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.organisation.dto.TrainerAssignmentRequest;
import com.xebia.lms.organisation.entity.TrainerAssignment;
import com.xebia.lms.organisation.repository.TrainerAssignmentRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TrainerAssignmentService {
    private final TrainerAssignmentRepository assignments;
    private final PermissionGuard guard;

    public TrainerAssignmentService(TrainerAssignmentRepository assignments, PermissionGuard guard) {
        this.assignments = assignments;
        this.guard = guard;
    }

    @Transactional
    public TrainerAssignment create(TrainerAssignmentRequest request) {
        guard.requireTenant();
        TrainerAssignment assignment = new TrainerAssignment();
        assignment.setTenantId(TenantContext.tenantId());
        assignment.setTrainerId(request.trainerId());
        assignment.setUniversityId(request.universityId());
        assignment.setSubjectCode(request.subjectCode());
        return assignments.save(assignment);
    }

    public List<TrainerAssignment> list() {
        guard.requireTenant();
        return assignments.findByTenantId(TenantContext.tenantId());
    }
}
