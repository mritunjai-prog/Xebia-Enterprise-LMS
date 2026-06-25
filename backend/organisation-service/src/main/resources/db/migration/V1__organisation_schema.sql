CREATE SCHEMA IF NOT EXISTS organisation;

CREATE TABLE universities (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    name VARCHAR(240) NOT NULL,
    type VARCHAR(40) NOT NULL,
    official_contact_name VARCHAR(200) NOT NULL,
    official_contact_email VARCHAR(320) NOT NULL,
    official_contact_phone VARCHAR(40),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE organisations (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    name VARCHAR(240) NOT NULL,
    official_contact_email VARCHAR(320) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE trainer_assignments (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    trainer_id UUID NOT NULL,
    university_id UUID NOT NULL,
    subject_code VARCHAR(120) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
