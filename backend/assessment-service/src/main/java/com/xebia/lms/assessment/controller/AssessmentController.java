package com.xebia.lms.assessment.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assessments")
public class AssessmentController {
    @GetMapping
    List<String> plannedAssessmentTypes() {
        return List.of("THEORETICAL", "PRACTICAL", "THEORY_BASED");
    }
}
