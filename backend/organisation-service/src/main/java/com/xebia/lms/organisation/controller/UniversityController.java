package com.xebia.lms.organisation.controller;

import com.xebia.lms.organisation.dto.OfficialContactRequest;
import com.xebia.lms.organisation.dto.UniversityRequest;
import com.xebia.lms.organisation.dto.UniversityResponse;
import com.xebia.lms.organisation.service.UniversityService;
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
@RequestMapping("/universities")
public class UniversityController {
    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    UniversityResponse create(@Valid @RequestBody UniversityRequest request) {
        return universityService.create(request);
    }

    @GetMapping
    List<UniversityResponse> list() {
        return universityService.list();
    }

    @GetMapping("/{id}")
    UniversityResponse get(@PathVariable UUID id) {
        return universityService.get(id);
    }

    @PostMapping("/{id}/official-contact")
    UniversityResponse officialContact(@PathVariable UUID id, @Valid @RequestBody OfficialContactRequest request) {
        return universityService.updateOfficialContact(id, request);
    }
}
