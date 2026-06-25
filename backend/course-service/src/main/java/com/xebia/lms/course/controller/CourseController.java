package com.xebia.lms.course.controller;

import com.xebia.lms.course.dto.ContentItemRequest;
import com.xebia.lms.course.dto.CourseAssignmentRequest;
import com.xebia.lms.course.dto.CourseRequest;
import com.xebia.lms.course.dto.ModuleRequest;
import com.xebia.lms.course.entity.ContentItem;
import com.xebia.lms.course.entity.Course;
import com.xebia.lms.course.entity.CourseAssignment;
import com.xebia.lms.course.entity.CourseModule;
import com.xebia.lms.course.entity.SubModule;
import com.xebia.lms.course.service.CourseService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class CourseController {
    private final CourseService service;
    public CourseController(CourseService service) { this.service = service; }
    @GetMapping List<Course> list() { return service.list(); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) Course create(@Valid @RequestBody CourseRequest request) { return service.create(request); }
    @PostMapping("/{courseId}/modules") @ResponseStatus(HttpStatus.CREATED) CourseModule module(@PathVariable UUID courseId, @Valid @RequestBody ModuleRequest request) { return service.addModule(courseId, request); }
    @PostMapping("/{courseId}/modules/{moduleId}/submodules") @ResponseStatus(HttpStatus.CREATED) SubModule subModule(@PathVariable UUID moduleId, @Valid @RequestBody ModuleRequest request) { return service.addSubModule(moduleId, request); }
    @PostMapping("/{courseId}/content-items") @ResponseStatus(HttpStatus.CREATED) ContentItem content(@PathVariable UUID courseId, @Valid @RequestBody ContentItemRequest request) { return service.addContent(courseId, request); }
    @PostMapping("/{courseId}/assignments") @ResponseStatus(HttpStatus.CREATED) CourseAssignment assign(@PathVariable UUID courseId, @Valid @RequestBody CourseAssignmentRequest request) { return service.assign(courseId, request); }
}
