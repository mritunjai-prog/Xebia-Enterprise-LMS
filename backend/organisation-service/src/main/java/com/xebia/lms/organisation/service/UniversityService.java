package com.xebia.lms.organisation.service;

import com.xebia.lms.common.exception.BusinessException;
import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.organisation.dto.OfficialContactRequest;
import com.xebia.lms.organisation.dto.UniversityRequest;
import com.xebia.lms.organisation.dto.UniversityResponse;
import com.xebia.lms.organisation.entity.InstitutionType;
import com.xebia.lms.organisation.entity.University;
import com.xebia.lms.organisation.event.OrganisationEventPublisher;
import com.xebia.lms.organisation.mapper.OrganisationMapper;
import com.xebia.lms.organisation.repository.UniversityRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UniversityService {
    private final UniversityRepository universities;
    private final PermissionGuard guard;
    private final OrganisationEventPublisher publisher;

    public UniversityService(UniversityRepository universities, PermissionGuard guard, OrganisationEventPublisher publisher) {
        this.universities = universities;
        this.guard = guard;
        this.publisher = publisher;
    }

    @Transactional
    public UniversityResponse create(UniversityRequest request) {
        guard.requireTenant();
        University university = new University();
        university.setTenantId(TenantContext.tenantId());
        university.setName(request.name());
        university.setType(request.type() == null ? InstitutionType.UNIVERSITY : request.type());
        university.setOfficialContactName(request.officialContactName());
        university.setOfficialContactEmail(request.officialContactEmail());
        university.setOfficialContactPhone(request.officialContactPhone());
        University saved = universities.save(university);
        publisher.universityCreated(saved.getTenantId(), TenantContext.userId(), saved.getId(), saved.getOfficialContactEmail());
        return OrganisationMapper.university(saved);
    }

    public List<UniversityResponse> list() {
        guard.requireTenant();
        return universities.findByTenantId(TenantContext.tenantId()).stream().map(OrganisationMapper::university).toList();
    }

    public UniversityResponse get(UUID id) {
        guard.requireTenant();
        University university = universities.findById(id)
                .filter(found -> found.getTenantId().equals(TenantContext.tenantId()))
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "University not found"));
        return OrganisationMapper.university(university);
    }

    @Transactional
    public UniversityResponse updateOfficialContact(UUID id, OfficialContactRequest request) {
        guard.requireTenant();
        University university = universities.findById(id)
                .filter(found -> found.getTenantId().equals(TenantContext.tenantId()))
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "University not found"));
        university.setOfficialContactName(request.officialContactName());
        university.setOfficialContactEmail(request.officialContactEmail());
        university.setOfficialContactPhone(request.officialContactPhone());
        return OrganisationMapper.university(universities.save(university));
    }
}
