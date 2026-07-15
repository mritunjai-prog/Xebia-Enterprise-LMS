-- Seed demo users for Vercel deployment
-- Only inserts if the user ID doesn't already exist

INSERT INTO users (id, name, email, role, department, avatar)
VALUES
  ('usr_1', 'Mritunjai', 'mritunjai@xebia.com', 'teacher', 'Engineering', 'https://i.pravatar.cc/150?u=mritunjai')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, name, email, role, department, avatar)
VALUES
  ('usr_2', 'Manish', 'manish@xebia.com', 'teacher', 'Engineering', 'https://i.pravatar.cc/150?u=manish')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, name, email, role, department, avatar)
VALUES
  ('usr_3', 'Vijay', 'vijay@xebia.com', 'student', 'Computer Science', 'https://i.pravatar.cc/150?u=vijay')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, name, email, role, department, avatar)
VALUES
  ('usr_4', 'Abhijeet', 'abhijeet@xebia.com', 'student', 'Computer Science', 'https://i.pravatar.cc/150?u=abhijeet')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, name, email, role, department, avatar)
VALUES
  ('usr_5', 'Vinit', 'vinit@xebia.com', 'student', 'Computer Science', 'https://i.pravatar.cc/150?u=vinit')
ON CONFLICT (id) DO NOTHING;
