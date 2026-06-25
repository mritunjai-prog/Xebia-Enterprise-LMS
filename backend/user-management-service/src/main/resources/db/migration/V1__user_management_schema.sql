CREATE SCHEMA IF NOT EXISTS user_management;

CREATE TABLE managed_users (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    iam_user_id UUID NOT NULL,
    email VARCHAR(320) NOT NULL,
    full_name VARCHAR(240) NOT NULL,
    user_type VARCHAR(40) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE trainer_profiles (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    managed_user_id UUID NOT NULL,
    primary_subject VARCHAR(160),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE student_profiles (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    managed_user_id UUID NOT NULL,
    university_id UUID,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
