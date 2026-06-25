package com.xebia.lms.course.service;

import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.course.dto.ContentItemRequest;
import com.xebia.lms.course.dto.CourseAssignmentRequest;
import com.xebia.lms.course.dto.CourseRequest;
import com.xebia.lms.course.dto.ModuleRequest;
import com.xebia.lms.course.entity.ContentItem;
import com.xebia.lms.course.entity.Course;
import com.xebia.lms.course.entity.CourseAssignment;
import com.xebia.lms.course.entity.CourseModule;
import com.xebia.lms.course.entity.SubModule;
import com.xebia.lms.course.event.CourseEventPublisher;
import com.xebia.lms.course.repository.ContentItemRepository;
import com.xebia.lms.course.repository.CourseAssignmentRepository;
import com.xebia.lms.course.repository.CourseModuleRepository;
import com.xebia.lms.course.repository.CourseRepository;
import com.xebia.lms.course.repository.SubModuleRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseService {
    private final CourseRepository courses;
    private final CourseModuleRepository modules;
    private final SubModuleRepository subModules;
    private final ContentItemRepository contentItems;
    private final CourseAssignmentRepository assignments;
    private final PermissionGuard guard;
    private final CourseEventPublisher publisher;

    public CourseService(CourseRepository courses, CourseModuleRepository modules, SubModuleRepository subModules, ContentItemRepository contentItems, CourseAssignmentRepository assignments, PermissionGuard guard, CourseEventPublisher publisher) {
        this.courses = courses; this.modules = modules; this.subModules = subModules; this.contentItems = contentItems; this.assignments = assignments; this.guard = guard; this.publisher = publisher;
    }

    public List<Course> list() { guard.requireTenant(); return courses.findByTenantId(TenantContext.tenantId()); }

    @Transactional
    public Course create(CourseRequest request) {
        guard.requireTenant();
        Course course = new Course();
        course.setTenantId(TenantContext.tenantId());
        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setPublished(request.published());
        return courses.save(course);
    }

    @Transactional
    public CourseModule addModule(UUID courseId, ModuleRequest request) {
        CourseModule module = new CourseModule();
        module.setTenantId(TenantContext.tenantId());
        module.setCourseId(courseId);
        module.setTitle(request.title());
        module.setPosition(request.position());
        return modules.save(module);
    }

    @Transactional
    public SubModule addSubModule(UUID moduleId, ModuleRequest request) {
        SubModule subModule = new SubModule();
        subModule.setTenantId(TenantContext.tenantId());
        subModule.setModuleId(moduleId);
        subModule.setTitle(request.title());
        subModule.setPosition(request.position());
        return subModules.save(subModule);
    }

    @Transactional
    public ContentItem addContent(UUID courseId, ContentItemRequest request) {
        ContentItem item = new ContentItem();
        item.setTenantId(TenantContext.tenantId());
        item.setCourseId(courseId);
        item.setModuleId(request.moduleId());
        item.setSubModuleId(request.subModuleId());
        item.setTitle(request.title());
        item.setType(request.type());
        item.setStorageRef(request.storageRef());
        item.setPosition(request.position());
        return contentItems.save(item);
    }

    @Transactional
    public CourseAssignment assign(UUID courseId, CourseAssignmentRequest request) {
        CourseAssignment assignment = new CourseAssignment();
        assignment.setTenantId(TenantContext.tenantId());
        assignment.setCourseId(courseId);
        assignment.setBatchId(request.batchId());
        assignment.setStudentId(request.studentId());
        CourseAssignment saved = assignments.save(assignment);
        publisher.courseAssigned(TenantContext.tenantId(), TenantContext.userId(), courseId, request.batchId(), request.studentId());
        return saved;
    }
}
