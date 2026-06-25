INSERT INTO universities (
    id,
    tenant_id,
    name,
    type,
    official_contact_name,
    official_contact_email,
    official_contact_phone,
    created_at,
    updated_at
) VALUES (
    '40000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Xebia University',
    'UNIVERSITY',
    'Registrar',
    'registrar@example.edu',
    '+911234567890',
    NOW(),
    NOW()
);

INSERT INTO organisations (
    id,
    tenant_id,
    name,
    official_contact_email,
    created_at,
    updated_at
) VALUES (
    '40000000-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Xebia Training Organisation',
    'training@example.edu',
    NOW(),
    NOW()
);
