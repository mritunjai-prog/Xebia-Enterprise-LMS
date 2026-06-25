CREATE SCHEMA IF NOT EXISTS approval;

CREATE TABLE approval_requests (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    requested_by UUID NOT NULL,
    action_code VARCHAR(120) NOT NULL,
    resource_type VARCHAR(120) NOT NULL,
    resource_id VARCHAR(160) NOT NULL,
    payload_json TEXT,
    status VARCHAR(40) NOT NULL,
    decided_by UUID,
    decision_reason VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE approval_policies (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    role_code VARCHAR(120) NOT NULL,
    action_code VARCHAR(120) NOT NULL,
    resource_type VARCHAR(120) NOT NULL,
    approval_required BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
