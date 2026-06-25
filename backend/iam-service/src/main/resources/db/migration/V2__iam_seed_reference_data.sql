INSERT INTO roles (id, code, name, system_role, active, created_at, updated_at) VALUES
('10000000-0000-0000-0000-000000000001', 'ADMIN', 'Admin', true, true, NOW(), NOW()),
('10000000-0000-0000-0000-000000000002', 'MANAGER', 'Manager', false, true, NOW(), NOW()),
('10000000-0000-0000-0000-000000000003', 'TRAINER', 'Trainer', false, true, NOW(), NOW()),
('10000000-0000-0000-0000-000000000004', 'ORGANISER', 'Organiser', false, true, NOW(), NOW()),
('10000000-0000-0000-0000-000000000005', 'STUDENT', 'Student', false, true, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

INSERT INTO permissions (id, code, description, created_at, updated_at) VALUES
('20000000-0000-0000-0000-000000000001', 'IAM_MANAGE', 'Manage roles, permissions and modules', NOW(), NOW()),
('20000000-0000-0000-0000-000000000002', 'ORG_MANAGE', 'Manage organisations and universities', NOW(), NOW()),
('20000000-0000-0000-0000-000000000003', 'USER_MANAGE', 'Create and manage users', NOW(), NOW()),
('20000000-0000-0000-0000-000000000004', 'COURSE_MANAGE', 'Create courses and content', NOW(), NOW()),
('20000000-0000-0000-0000-000000000005', 'BATCH_MANAGE', 'Create batches and enrolments', NOW(), NOW()),
('20000000-0000-0000-0000-000000000006', 'ASSESSMENT_MANAGE', 'Create and evaluate assessments', NOW(), NOW()),
('20000000-0000-0000-0000-000000000007', 'APPROVAL_DECIDE', 'Approve or reject governed actions', NOW(), NOW()),
('20000000-0000-0000-0000-000000000008', 'NOTIFICATION_SEND', 'Create notification requests', NOW(), NOW()),
('20000000-0000-0000-0000-000000000009', 'MEDIA_MANAGE', 'Manage media and streaming metadata', NOW(), NOW()),
('20000000-0000-0000-0000-000000000010', 'DOCUMENT_GENERATE', 'Generate documents', NOW(), NOW()),
('20000000-0000-0000-0000-000000000011', 'REPORT_VIEW', 'View audit and activity reports', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

INSERT INTO modules (id, code, display_name, route, created_at, updated_at) VALUES
('30000000-0000-0000-0000-000000000001', 'IAM', 'Iam', '/iam', NOW(), NOW()),
('30000000-0000-0000-0000-000000000002', 'ORGANISATION', 'Organisation', '/organisation', NOW(), NOW()),
('30000000-0000-0000-0000-000000000003', 'USERS', 'Users', '/users', NOW(), NOW()),
('30000000-0000-0000-0000-000000000004', 'COURSES', 'Courses', '/courses', NOW(), NOW()),
('30000000-0000-0000-0000-000000000005', 'BATCHES', 'Batches', '/batches', NOW(), NOW()),
('30000000-0000-0000-0000-000000000006', 'ASSESSMENTS', 'Assessments', '/assessments', NOW(), NOW()),
('30000000-0000-0000-0000-000000000007', 'APPROVALS', 'Approvals', '/approvals', NOW(), NOW()),
('30000000-0000-0000-0000-000000000008', 'NOTIFICATIONS', 'Notifications', '/notifications', NOW(), NOW()),
('30000000-0000-0000-0000-000000000009', 'MEDIA', 'Media', '/media', NOW(), NOW()),
('30000000-0000-0000-0000-000000000010', 'ENGAGEMENT', 'Engagement', '/engagement', NOW(), NOW()),
('30000000-0000-0000-0000-000000000011', 'DOCUMENTS', 'Documents', '/documents', NOW(), NOW()),
('30000000-0000-0000-0000-000000000012', 'REPORTS', 'Reports', '/reports', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

INSERT INTO role_permissions (id, role_id, permission_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, p.id, NOW(), NOW()
FROM roles r
CROSS JOIN permissions p
WHERE r.code = 'ADMIN';

INSERT INTO role_permissions (id, role_id, permission_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, p.id, NOW(), NOW()
FROM roles r
JOIN permissions p ON p.code IN ('ORG_MANAGE', 'USER_MANAGE', 'COURSE_MANAGE', 'BATCH_MANAGE', 'NOTIFICATION_SEND', 'REPORT_VIEW')
WHERE r.code = 'MANAGER';

INSERT INTO role_permissions (id, role_id, permission_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, p.id, NOW(), NOW()
FROM roles r
JOIN permissions p ON p.code IN ('COURSE_MANAGE', 'BATCH_MANAGE', 'ASSESSMENT_MANAGE', 'NOTIFICATION_SEND')
WHERE r.code IN ('TRAINER', 'ORGANISER');

INSERT INTO role_modules (id, role_id, module_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, m.id, NOW(), NOW()
FROM roles r
CROSS JOIN modules m
WHERE r.code = 'ADMIN';

INSERT INTO role_modules (id, role_id, module_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, m.id, NOW(), NOW()
FROM roles r
JOIN modules m ON m.code IN ('ORGANISATION', 'USERS', 'COURSES', 'BATCHES', 'NOTIFICATIONS', 'REPORTS')
WHERE r.code = 'MANAGER';

INSERT INTO role_modules (id, role_id, module_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, m.id, NOW(), NOW()
FROM roles r
JOIN modules m ON m.code IN ('COURSES', 'BATCHES', 'ASSESSMENTS', 'NOTIFICATIONS')
WHERE r.code IN ('TRAINER', 'ORGANISER');

INSERT INTO role_modules (id, role_id, module_id, created_at, updated_at)
SELECT gen_random_uuid(), r.id, m.id, NOW(), NOW()
FROM roles r
JOIN modules m ON m.code IN ('COURSES', 'ASSESSMENTS', 'MEDIA', 'ENGAGEMENT')
WHERE r.code = 'STUDENT';
