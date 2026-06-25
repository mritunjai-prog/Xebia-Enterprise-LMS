package com.xebia.lms.batch.service;

import com.xebia.lms.batch.dto.BatchRequest;
import com.xebia.lms.batch.dto.EnrolmentRequest;
import com.xebia.lms.batch.entity.BatchEntity;
import com.xebia.lms.batch.entity.Enrolment;
import com.xebia.lms.batch.event.EnrolmentEventPublisher;
import com.xebia.lms.batch.repository.BatchRepository;
import com.xebia.lms.batch.repository.EnrolmentRepository;
import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BatchService {
    private final BatchRepository batches;
    private final EnrolmentRepository enrolments;
    private final PermissionGuard guard;
    private final EnrolmentEventPublisher publisher;
    public BatchService(BatchRepository batches, EnrolmentRepository enrolments, PermissionGuard guard, EnrolmentEventPublisher publisher) {
        this.batches = batches; this.enrolments = enrolments; this.guard = guard; this.publisher = publisher;
    }
    public List<BatchEntity> listBatches() { guard.requireTenant(); return batches.findByTenantId(TenantContext.tenantId()); }
    public List<Enrolment> listEnrolments() { guard.requireTenant(); return enrolments.findByTenantId(TenantContext.tenantId()); }
    @Transactional public BatchEntity createBatch(BatchRequest request) {
        guard.requireTenant();
        BatchEntity batch = new BatchEntity();
        batch.setTenantId(TenantContext.tenantId());
        batch.setUniversityId(request.universityId());
        batch.setName(request.name());
        batch.setStartsAt(request.startsAt());
        batch.setEndsAt(request.endsAt());
        batch.setScheduleText(request.scheduleText());
        return batches.save(batch);
    }
    @Transactional public Enrolment enrol(EnrolmentRequest request) {
        guard.requireTenant();
        Enrolment enrolment = new Enrolment();
        enrolment.setTenantId(TenantContext.tenantId());
        enrolment.setStudentId(request.studentId());
        enrolment.setBatchId(request.batchId());
        enrolment.setCourseId(request.courseId());
        Enrolment saved = enrolments.save(enrolment);
        publisher.enrolmentCreated(saved.getTenantId(), TenantContext.userId(), saved.getId());
        return saved;
    }
}
