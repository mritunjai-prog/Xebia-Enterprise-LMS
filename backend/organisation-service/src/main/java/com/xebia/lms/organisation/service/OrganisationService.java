package com.xebia.lms.organisation.service;

import com.xebia.lms.common.security.PermissionGuard;
import com.xebia.lms.common.security.TenantContext;
import com.xebia.lms.organisation.dto.OrganisationRequest;
import com.xebia.lms.organisation.dto.OrganisationResponse;
import com.xebia.lms.organisation.entity.Organisation;
import com.xebia.lms.organisation.mapper.OrganisationMapper;
import com.xebia.lms.organisation.repository.OrganisationRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrganisationService {
    private final OrganisationRepository organisations;
    private final PermissionGuard guard;

    public OrganisationService(OrganisationRepository organisations, PermissionGuard guard) {
        this.organisations = organisations;
        this.guard = guard;
    }

    @Transactional
    public OrganisationResponse create(OrganisationRequest request) {
        guard.requireTenant();
        Organisation organisation = new Organisation();
        organisation.setTenantId(TenantContext.tenantId());
        organisation.setName(request.name());
        organisation.setOfficialContactEmail(request.officialContactEmail());
        return OrganisationMapper.organisation(organisations.save(organisation));
    }

    public List<OrganisationResponse> list() {
        guard.requireTenant();
        return organisations.findByTenantId(TenantContext.tenantId()).stream()
                .map(OrganisationMapper::organisation)
                .toList();
    }
}
