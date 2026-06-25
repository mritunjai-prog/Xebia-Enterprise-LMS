CREATE SCHEMA IF NOT EXISTS batch_enrolment;

CREATE TABLE batches (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    university_id UUID NOT NULL,
    name VARCHAR(240) NOT NULL,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    schedule_text VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE enrolments (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    batch_id UUID,
    course_id UUID,
    status VARCHAR(40) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
