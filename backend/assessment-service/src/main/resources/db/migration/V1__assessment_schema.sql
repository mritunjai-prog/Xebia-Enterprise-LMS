CREATE SCHEMA IF NOT EXISTS assessment;

CREATE TABLE assessments (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    batch_id UUID NOT NULL,
    title VARCHAR(240) NOT NULL,
    type VARCHAR(60) NOT NULL,
    max_marks INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE submissions (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    assessment_id UUID NOT NULL,
    student_id UUID NOT NULL,
    submission_ref VARCHAR(500),
    marks NUMERIC(8,2),
    evaluator_comment VARCHAR(1000),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
