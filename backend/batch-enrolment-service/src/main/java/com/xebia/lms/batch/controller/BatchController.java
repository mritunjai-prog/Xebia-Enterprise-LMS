package com.xebia.lms.batch.controller;

import com.xebia.lms.batch.dto.BatchRequest;
import com.xebia.lms.batch.dto.EnrolmentRequest;
import com.xebia.lms.batch.entity.BatchEntity;
import com.xebia.lms.batch.entity.Enrolment;
import com.xebia.lms.batch.service.BatchService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BatchController {
    private final BatchService service;
    public BatchController(BatchService service) { this.service = service; }
    @GetMapping("/batches") List<BatchEntity> batches() { return service.listBatches(); }
    @PostMapping("/batches") @ResponseStatus(HttpStatus.CREATED) BatchEntity createBatch(@Valid @RequestBody BatchRequest request) { return service.createBatch(request); }
    @PostMapping("/enrolments") @ResponseStatus(HttpStatus.CREATED) Enrolment enrol(@Valid @RequestBody EnrolmentRequest request) { return service.enrol(request); }
    @GetMapping("/enrolments") List<Enrolment> enrolments() { return service.listEnrolments(); }
}
