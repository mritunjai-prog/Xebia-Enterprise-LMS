INSERT INTO batches (
    id,
    tenant_id,
    university_id,
    name,
    starts_at,
    ends_at,
    schedule_text,
    created_at,
    updated_at
) VALUES (
    '60000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    '40000000-0000-0000-0000-000000000001',
    'Enterprise Java June Batch',
    '2026-07-01T09:00:00+05:30',
    '2026-09-30T18:00:00+05:30',
    'Monday to Friday, 09:00-11:00 IST',
    NOW(),
    NOW()
);
