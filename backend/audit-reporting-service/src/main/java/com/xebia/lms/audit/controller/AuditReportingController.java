package com.xebia.lms.audit.controller;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditReportingController {
    @GetMapping("/audit-logs")
    List<String> logs() { return List.of("LOGIN", "ROLE_CHANGE", "PERMISSION_CHANGE", "APPROVAL", "PROVISIONING", "DELETE_OR_DEACTIVATE"); }

    @GetMapping("/reports/governance")
    Map<String, Object> governance() { return Map.of("pendingApprovals", 0, "deliveryFailures", 0); }
}
