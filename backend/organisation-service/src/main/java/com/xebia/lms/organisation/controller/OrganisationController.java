package com.xebia.lms.organisation.controller;

import com.xebia.lms.organisation.dto.OrganisationRequest;
import com.xebia.lms.organisation.dto.OrganisationResponse;
import com.xebia.lms.organisation.service.OrganisationService;
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
@RequestMapping
public class OrganisationController {
    private final OrganisationService organisationService;

    public OrganisationController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    OrganisationResponse create(@Valid @RequestBody OrganisationRequest request) {
        return organisationService.create(request);
    }

    @GetMapping
    List<OrganisationResponse> list() {
        return organisationService.list();
    }
}
