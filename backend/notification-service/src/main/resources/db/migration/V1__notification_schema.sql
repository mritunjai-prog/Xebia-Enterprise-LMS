CREATE SCHEMA IF NOT EXISTS notification;

CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    source_event_id VARCHAR(160) NOT NULL UNIQUE,
    recipient VARCHAR(320) NOT NULL,
    channel VARCHAR(40) NOT NULL,
    subject VARCHAR(240) NOT NULL,
    body TEXT NOT NULL,
    attachment_ref VARCHAR(500),
    status VARCHAR(40) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE TABLE delivery_attempts (
    id UUID PRIMARY KEY,
    notification_id UUID NOT NULL,
    channel VARCHAR(40) NOT NULL,
    status VARCHAR(40) NOT NULL,
    attempt_number INTEGER NOT NULL,
    next_attempt_at TIMESTAMPTZ,
    provider_response VARCHAR(1000),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);
