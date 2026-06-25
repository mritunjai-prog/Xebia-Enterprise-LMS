package com.xebia.lms.approval.controller;

import com.xebia.lms.approval.dto.CreateApprovalRequest;
import com.xebia.lms.approval.dto.DecisionRequest;
import com.xebia.lms.approval.dto.PolicyRequest;
import com.xebia.lms.approval.entity.ApprovalPolicy;
import com.xebia.lms.approval.entity.ApprovalRequestEntity;
import com.xebia.lms.approval.entity.ApprovalStatus;
import com.xebia.lms.approval.service.ApprovalWorkflowService;
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
public class ApprovalController {
    private final ApprovalWorkflowService service;
    public ApprovalController(ApprovalWorkflowService service) { this.service = service; }
    @PostMapping("/requests") @ResponseStatus(HttpStatus.CREATED) ApprovalRequestEntity request(@Valid @RequestBody CreateApprovalRequest input) { return service.request(input); }
    @GetMapping("/requests") List<ApprovalRequestEntity> requests() { return service.listRequests(); }
    @PostMapping("/requests/{id}/approve") ApprovalRequestEntity approve(@PathVariable UUID id, @RequestBody(required = false) DecisionRequest decision) { return service.decide(id, ApprovalStatus.EXECUTED, decision); }
    @PostMapping("/requests/{id}/reject") ApprovalRequestEntity reject(@PathVariable UUID id, @RequestBody(required = false) DecisionRequest decision) { return service.decide(id, ApprovalStatus.REJECTED, decision); }
    @PostMapping("/policies") @ResponseStatus(HttpStatus.CREATED) ApprovalPolicy policy(@Valid @RequestBody PolicyRequest input) { return service.policy(input); }
    @GetMapping("/policies") List<ApprovalPolicy> policies() { return service.listPolicies(); }
}
