# XEBIA ENTERPRISE LMS — PROJECT MEMORY

> **Purpose**: Single source-of-truth context file. Loaded by AI assistants and new developers to gain full project understanding with zero prior knowledge.
> **Last Updated**: 2026-07-14
> **Repo**: https://github.com/mritunjai-prog/Xebia-Enterprise-LMS (branch: `lms-integrate`)

---

## 1. PROJECT OVERVIEW

**What it is**: Xebia Enterprise LMS is a full-stack, enterprise-grade Learning Management System (LMS) built for Xebia. It enables trainers to create and deliver assessments (MCQ, coding, mixed), manage student batches, track performance, and build rich structured courses. Students can take assessments, view results with certificates, browse courses, and track progress.

**Target Users**:
- **Trainers (Teachers)**: Create assessments, manage batches, evaluate submissions, view analytics
- **Students**: Take assessments (MCQ + coding), view results, earn certificates, browse/enroll in courses
- **Admins**: Manage users, courses, categories, view analytics dashboards

**Current Build Status**:
| Area | Status | Notes |
|---|---|---|
| Student Portal (Frontend) | ~85% | Core flow working; courses, assessments, results, certificates done |
| Trainer Portal (Frontend) | ~80% | Dashboard, batches, assessment builder, evaluation, leaderboard done |
| Admin Portal (Frontend) | ~70% | Course/category management done; analytics built with mock data |
| Backend - User Service | 100% | Full CRUD for users |
| Backend - Batch Service | 100% | Full CRUD for batches |
| Backend - Assessment Service | 95% | Assessments, submissions, drafts, AI desc gen all working |
| Backend - Course Service | 90% | Courses, categories, modules, submodules, content, enrollment, progress |
| Backend - API Gateway | 100% | Routing all services at port 8080 |
| Auth | 0% NOT IMPLEMENTED | Login uses email-matching against DB data. JWT/IAM is future work |
| Database | Working | PostgreSQL via Docker; Hibernate auto-DDL creates schema |

**Product Vision** (from code comments):
- "Deliver secure, scalable, and intelligent assessments with automated grading, real-time analytics, and seamless learning experiences — all from one enterprise platform."
- Future: IAM/JWT auth via API Gateway, Kafka for events, multi-tenancy (X-Tenant-Id header already wired).

---

## 2. TECH STACK (FULL DETAIL)

### Frontend
| Property | Value |
|---|---|
| Framework | React 19.2.0 |
| Meta-framework | TanStack Start 1.167.x (SSR-capable Vite-based) |
| Routing | TanStack Router 1.168.x (file-based via src/routes/) |
| State Management | React Context API (LMSContext) + Zustand 5.0.14 |
| Data Fetching | Custom fetch wrappers (src/api/client.js, src/services/api.js) |
| Forms | React Hook Form 7.71.x + Zod 3.24.x |
| Styling | Tailwind CSS v4.2.x; custom tokens in src/styles.css |
| UI Components | shadcn/ui (Radix UI + CVA) — 47 components in src/components/ui/ |
| Animation | Framer Motion 12.x |
| Charts | Recharts 2.15.x |
| Code Editor | Monaco Editor (@monaco-editor/react 4.7.x) |
| PDF/Certificate | jsPDF 4.2.x + html2canvas-pro 2.2.x |
| Build Tool | Vite 8.0.x |
| SSR/Server | Nitro (node-server locally; vercel on Vercel) |
| Language | JavaScript (JSX); TypeScript only for route tree gen |

### Backend
| Property | Value |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.x |
| Server Type | REST API |
| ORM | Hibernate via Spring Data JPA |
| Build Tool | Maven 3.9.6 |
| Services | user-service:8081, batch-service:8085, assessment-service:8086, course-service:8084, api-gateway:8080 |

### Database
| Property | Value |
|---|---|
| Engine | PostgreSQL 16-alpine |
| Hosting | Docker container locally |
| Schema Management | Hibernate ddl-auto |
| Cache | Redis 7-alpine (used for draft saving) |

### Auth
| Property | Value |
|---|---|
| Current | FAKE: LMSContext.login() finds user by email. No password. No JWT. |
| Session | localStorage.setItem("session", JSON.stringify(currentUser)) |
| Future Plan | API Gateway IAM service with JWT. X-User-Id header already propagated as placeholder |

### Third-Party Services
| Service | Purpose | Config |
|---|---|---|
| Cloudinary | Image/video/document upload for course content | VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET |
| Google Generative AI | AI features | Used via Groq API key |
| Groq API | LLM inference for AI description generator | VITE_GROQ_API_KEY |

### DevOps
| Property | Value |
|---|---|
| Local Dev | Docker Compose (backend/docker-compose.yml) starts all 7 containers |
| Frontend Local | npm run dev — Vite on port 3000 with /api proxy to localhost:8080 |
| Cloud Deployment | Render.com (render.yaml present) |
| Containerization | Docker — each backend service has a Dockerfile |
| Frontend Deploy | Vercel (Nitro detects process.env.VERCEL and switches preset) |

---

## 3. DESIGN SYSTEM

### Color Palette

| Token | Light Value | Dark Value | Role |
|---|---|---|---|
| --background | #F3F4F6 | #000000 | App background |
| --foreground | #000000 | #F7F8FC | Body text |
| --card | #FFFFFF | #151515 | Card surface |
| --card-foreground | #000000 | #F7F8FC | Card text |
| --primary | #6C1D5F | #84117C | Brand primary, buttons |
| --primary-foreground | #FFFFFF | #FFFFFF | Text on primary |
| --primary-glow | #84117C | #6C1D5F | Glow effects |
| --secondary | #DADCEA | #4A1E47 | Secondary surfaces |
| --secondary-foreground | #4A1E47 | #D3CCEC | Secondary text |
| --muted | #DEDEDE | #5A5A5A | Muted surfaces |
| --muted-foreground | #5A5A5A | #DEDEDE | Muted text |
| --accent | #84117C | #01AC9F | Accent highlights |
| --accent-2 | #01AC9F (Emerald) | #6C1D5F | Secondary accent |
| --destructive | #FF6200 (CTA Orange) | #FF6200 | Errors, destructive |
| --border | #DADCEA | #5A5A5A | Borders |
| --ring | #6C1D5F | #84117C | Focus rings |
| --chart-1 | #5C4F61 | #9D92B2 | Chart color 1 |
| --chart-2 | #855889 | #D3CCEC | Chart color 2 |
| --chart-3 | #533754 | #B8AFCF | Chart color 3 |
| --chart-4 | #91759E | #91759E | Chart color 4 |
| --chart-5 | #4A1E47 | #855889 | Chart color 5 |

Special tokens:
- --glass-bg: rgba(255,255,255,0.65) / rgba(20,20,20,0.7)
- --gradient-brand: linear-gradient(135deg, #6C1D5F, #84117C, #01AC9F)
- --shadow-glow: 0 20px 60px -20px rgba(108,29,95,0.45)
- --radius: 1rem (base)

### Typography
- Sans: Inter (body, 15px base, line-height 1.6)
- Display: Poppins / Inter (h1-h4, letter-spacing -0.02em)

### shadcn/ui Components (47 total in src/components/ui/)
accordion, alert-dialog, alert, avatar, badge, button, calendar, card, carousel, chart, checkbox, command, dialog, drawer, dropdown-menu, form, input, label, popover, progress, radio-group, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, tooltip, DateTimePicker, + more

---

## 4. PROJECT ARCHITECTURE

### Folder Structure

`
d:\Xebia Integrated\
├── src/
│   ├── api/client.js              <- Core apiClient (users, batches, assessments, submissions, drafts)
│   ├── components/
│   │   ├── ui/                    <- 47 shadcn/ui primitives
│   │   ├── layout/                <- UnifiedLayout, StudentSidebar, StudentNavbar, UnifiedSidebar
│   │   ├── analytics/             <- Analytics chart subcomponents
│   │   ├── assessment-builder/    <- AssessmentBuilder sub-panels
│   │   ├── landing/               <- Landing page sections
│   │   ├── manager/               <- Admin sub-components
│   │   └── cursor-trail.jsx       <- Animated cursor trail
│   ├── config/student-identity.js <- TEMPORARY_STUDENT_ID constant
│   ├── context/LMSContext.jsx     <- Global state (users, batches, assessments, submissions, theme, auth)
│   ├── features/student/          <- Student-specific feature components
│   ├── lib/
│   │   ├── cloudinary.js          <- Cloudinary URL helpers
│   │   └── mock-data/             <- Mock data for analytics views
│   ├── pages/                     <- 16 page-level components
│   ├── routes/                    <- TanStack Router file-based routes
│   │   ├── __root.jsx             <- Root (wraps LMSProvider, QueryClient)
│   │   ├── index.jsx              <- / redirect to /login
│   │   ├── admin.jsx + admin/     <- Admin portal (checks teacher/admin role)
│   │   ├── trainer.jsx + trainer/ <- Trainer portal (checks teacher role)
│   │   └── student.jsx + student/ <- Student portal (checks student role)
│   ├── services/api.js            <- CourseService, EnrollmentService, ProgressService etc
│   ├── styles.css                 <- Tailwind v4 + all CSS design tokens
│   └── server.js                  <- Nitro SSR entry
├── backend/
│   ├── api-gateway/               <- Spring Cloud Gateway :8080
│   ├── user-service/              <- User CRUD :8081
│   ├── batch-service/             <- Batch CRUD :8085
│   ├── assessment-service/        <- Assessments + Submissions + AI :8086
│   ├── course-service/            <- Courses + Enrollment + Progress :8084
│   ├── common-lib/                <- Shared TenantScopedEntity base
│   └── docker-compose.yml         <- All 7 containers
├── public/
│   ├── logo-white.png             <- Xebia white logo (used on dark backgrounds)
│   ├── logo-purple.png
│   └── avatar.png
├── .env                           <- VITE_CLOUDINARY_*, VITE_GROQ_API_KEY
├── package.json
├── vite.config.js                 <- Vite + Nitro + /api proxy
├── render.yaml                    <- Render.com deployment
└── memory.md                      <- THIS FILE
`

### High-Level Data Flow

`
Browser -> Vite :3000 -> /api/* proxy -> API Gateway :8080
                                       -> /api/v1/users      -> user-service :8081    -> PostgreSQL
                                       -> /api/v1/batches    -> batch-service :8085   -> PostgreSQL
                                       -> /api/v1/assessments-> assessment-service :8086 -> PostgreSQL + Redis
                                       -> /api/v1/submissions-> assessment-service :8086
                                       -> /courses, /categories, /enrollments, /progress -> course-service :8084 -> PostgreSQL
`

### Architecture Diagram (Mermaid)

`mermaid
graph TD
    Browser["Browser (React 19 + TanStack Router)"]
    ViteDev["Vite Dev Server :3000"]
    Gateway["API Gateway :8080"]
    UserSvc["User Service :8081"]
    BatchSvc["Batch Service :8085"]
    AssessmentSvc["Assessment Service :8086"]
    CourseSvc["Course Service :8084"]
    PG["PostgreSQL :5432"]
    Redis["Redis :6379"]

    Browser --> ViteDev
    ViteDev -- "/api/* proxy" --> Gateway
    Gateway --> UserSvc & BatchSvc & AssessmentSvc & CourseSvc
    UserSvc & BatchSvc & CourseSvc --> PG
    AssessmentSvc --> PG & Redis
`

---

## 5. DATABASE ARCHITECTURE

### Table: users (user-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, auto UUID |
| name | VARCHAR(255) | |
| email | VARCHAR(255) | UNIQUE |
| role | VARCHAR(255) | "teacher" or "student" |
| department | VARCHAR(255) | |
| avatar | VARCHAR(255) | URL |
| average_score | INTEGER | Student stat |
| assessments_completed | INTEGER | Student stat |

### Table: batches (batch-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, auto UUID |
| name | VARCHAR(255) | |
| course | VARCHAR(255) | Course name string |
| student_count | INTEGER | |
| status | VARCHAR(255) | "active" or "completed" |
| created_at | VARCHAR(255) | ISO date |
| icon | VARCHAR(255) | Emoji |
| students | VARCHAR[] | ElementCollection of student UUIDs |

### Table: assessments (assessment-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, auto UUID |
| title | VARCHAR(255) | |
| description | VARCHAR(255) | |
| instructions | TEXT | |
| difficulty | VARCHAR(255) | easy/medium/hard |
| marks | INTEGER | Total marks |
| passing_marks | INTEGER | |
| duration | INTEGER | Minutes |
| start_date, start_time, end_date, end_time | VARCHAR(255) | |
| attempts_allowed | INTEGER | |
| auto_grade | BOOLEAN | |
| manual_grade | BOOLEAN | |
| status | VARCHAR(255) | draft/published/archived |
| type | VARCHAR(255) | mcq/assignment/mixed/coding |
| created_by | VARCHAR(255) | Teacher ID |
| created_at | VARCHAR(255) | |
| topic | VARCHAR(255) | |
| shuffle_questions | BOOLEAN | |
| randomize_options | BOOLEAN | |
| negative_marking | BOOLEAN | |
| negative_marks_value | INTEGER | |
| auto_submit | BOOLEAN | |
| batches | VARCHAR[] | ElementCollection of batch IDs |

### Table: questions (assessment-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, auto UUID |
| assessment_id | VARCHAR/UUID | FK -> assessments.id |
| type | VARCHAR(255) | mcq/text/coding |
| question | TEXT | |
| marks | INTEGER | |
| required | BOOLEAN | |
| options | TEXT[] | ElementCollection, MCQ choices |
| correct_answer | TEXT | |
| explanation | TEXT | |

### Table: submissions (assessment-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, manually set |
| assessment_id | VARCHAR/UUID | Logical FK |
| student_id | VARCHAR/UUID | Logical FK |
| status | VARCHAR(255) | in_progress/submitted |
| started_at, submitted_at | VARCHAR(255) | ISO datetime |
| score | INTEGER | |
| percentage | INTEGER | |
| time_taken | INTEGER | Seconds |
| is_evaluated | BOOLEAN | |
| remarks | TEXT | |
| evaluated_by | VARCHAR(255) | Teacher ID |

### Table: answers (assessment-service)
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR/UUID | PK, auto UUID |
| submission_id | VARCHAR/UUID | FK -> submissions.id |
| question_id | VARCHAR/UUID | Logical FK |
| answer | TEXT | JSON string for multi-select |
| marks_awarded | INTEGER | |
| remarks | TEXT | |

### Table: categories (course-service, schema: course)
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| tenant_id | UUID | Multi-tenancy |
| name | VARCHAR(255) | NOT NULL |
| slug | VARCHAR(255) | NOT NULL |
| icon | VARCHAR(255) | |
| description | VARCHAR(255) | |
| color | VARCHAR(255) | |
| is_active | BOOLEAN | NOT NULL, default true |

### Table: courses (course-service, schema: course)
Key columns: id (UUID PK), tenant_id, category_id (FK->categories), title (NOT NULL), description, published, subtitle, icon, thumbnail_image_url, banner_image, preview_video_url, duration_hours, duration_minutes, difficulty_level, language, visibility, is_active, is_featured, allow_enrolling (default true), course_code, learning_outcomes (text[]), prerequisites (text[]), target_audience (text[]), highlights (text[]), career_opportunities (text[]), PLUS extensive SEO fields (meta_title, meta_description, og_title, og_description, twitter_card, schema_markup, faq_schema etc), analytics fields (total_views, total_clicks, ctr, seo_score).

### Table: course_modules (course-service, schema: course)
id (UUID PK), course_id (FK->courses), title (NOT NULL), position (INT NOT NULL), description, is_active.

### Table: sub_modules (course-service, schema: course)
id (UUID PK), module_id (FK->course_modules), title, position, description, is_active.

### Table: content_items (course-service, schema: course)
Content blocks (VIDEO, PDF, TEXT, QUIZ) attached to submodules.

### Table: enrollments (course-service, schema: course)
Tracks student course enrollments.

### Table: course_progress / content_progress (course-service, schema: course)
Tracks completion per student per course/submodule.

### ER Diagram
`mermaid
erDiagram
    users { string id PK; string name; string email; string role }
    batches { string id PK; string name; string[] students }
    assessments { string id PK; string title; string type; string status; string[] batches }
    questions { string id PK; string assessment_id FK; string type; string correct_answer }
    submissions { string id PK; string assessment_id; string student_id; int score }
    answers { string id PK; string submission_id FK; string question_id; string answer }
    categories { uuid id PK; string name; string slug }
    courses { uuid id PK; uuid category_id FK; string title; boolean published }
    course_modules { uuid id PK; uuid course_id FK; string title; int position }

    assessments ||--o{ questions : "has"
    submissions ||--o{ answers : "has"
    categories ||--o{ courses : "belongs to"
    courses ||--o{ course_modules : "has"
`

---

## 6. API ARCHITECTURE

All routes proxied through API Gateway at localhost:8080.

### User Service
| Method | Path | Description | Status |
|---|---|---|---|
| GET | /api/v1/users | Get all users (opt ?role=teacher|student) | Working |
| POST | /api/v1/users | Create user | Working |

### Batch Service
| Method | Path | Description | Status |
|---|---|---|---|
| GET | /api/v1/batches | Get all batches | Working |
| POST | /api/v1/batches | Create batch | Working |
| PUT | /api/v1/batches/{id} | Update batch | Working |
| DELETE | /api/v1/batches/{id} | Delete batch | Working |

### Assessment Service
| Method | Path | Description | Status |
|---|---|---|---|
| GET | /api/v1/assessments | Get all assessments | Working |
| POST | /api/v1/assessments | Create assessment | Working |
| PUT | /api/v1/assessments/{id} | Update assessment | Working |
| DELETE | /api/v1/assessments/{id} | Delete assessment | Working |
| GET | /api/v1/submissions | Get all submissions (opt ?studentId=) | Working |
| POST | /api/v1/submissions | Submit assessment | Working |
| PUT | /api/v1/submissions/{id} | Update submission (evaluation) | Working |
| POST | /api/v1/assessments/drafts/{studentId}/{assessmentId} | Save draft to Redis | Working |
| GET | /api/v1/assessments/drafts/{studentId}/{assessmentId} | Get draft from Redis | Working |
| POST | /api/v1/assessments/ai/generate-description | AI generate description | Working |

### Course Service (no /api/v1/ prefix — routed by gateway)
| Method | Path | Description | Header |
|---|---|---|---|
| GET | /courses | List all courses | X-Tenant-Id |
| POST | /courses | Create course | X-Tenant-Id |
| PUT | /courses/{courseId} | Update course | |
| DELETE | /courses/{courseId} | Delete course | |
| POST | /courses/{courseId}/modules | Add module | |
| PUT | /courses/modules/{moduleId} | Update module | |
| DELETE | /courses/modules/{moduleId} | Delete module | |
| POST | /courses/{courseId}/modules/{moduleId}/submodules | Add submodule | |
| PUT | /courses/submodules/{subModuleId} | Update submodule | |
| DELETE | /courses/submodules/{subModuleId} | Delete submodule | |
| POST | /courses/{courseId}/content-items | Add content item | |
| PUT | /courses/content-items/{contentId} | Update content item | |
| DELETE | /courses/content-items/{contentId} | Delete content item | |
| GET | /courses/{courseId}/hierarchy | Full hierarchy (modules+submodules+content) | |
| GET | /categories | List all categories | |
| POST | /categories | Create category | |
| GET | /categories/{id} | Get category | |
| PUT | /categories/{id} | Update category | |
| DELETE | /categories/{id} | Delete category | |
| POST | /enrollments/{courseId} | Enroll student | X-User-Id |
| DELETE | /enrollments/{courseId} | Unenroll student | X-User-Id |
| GET | /enrollments/{courseId}/status | Check enrollment | X-User-Id |
| GET | /enrollments/my-courses | Student's courses | X-User-Id |
| POST | /progress/course/{courseId}/submodule/{submoduleId}/complete | Mark complete | X-User-Id |
| DELETE | /progress/course/{courseId}/submodule/{submoduleId}/complete | Mark incomplete | X-User-Id |
| GET | /progress/course/{courseId} | Get course progress | X-User-Id |

---

## 7. PORTALS BREAKDOWN

### 7A. Student Portal (/student/*)
Auth: currentUser.role === "student", else redirect to /

| Route | Page | Status | APIs |
|---|---|---|---|
| /student | StudentDashboard.jsx | Done | /api/v1/assessments, /submissions |
| /student/assessments | StudentAssessments.jsx | Done | /api/v1/assessments, /batches |
| /student/assessment/:assessmentId | AssessmentDetail.jsx | Done | /api/v1/assessments |
| /student/take/:slug | TakeQuiz.jsx | Done | assessments, submissions, drafts |
| /student/take-coding/:slug | TakeCoding.jsx | Done | assessments, submissions |
| /student/results | results/index.jsx | Done | /api/v1/submissions |
| /student/results/:slug/:id | Results.jsx | Done | submissions, assessments |
| /student/certificate/:submissionId | CertificateView.jsx | Done | /api/v1/submissions |
| /student/courses | courses.jsx | Done | /courses, /categories, /enrollments |
| /student/course/:courseId | course/.jsx | Done | /courses/:id/hierarchy, /progress |
| /student/batches | batches.jsx | Done | /api/v1/batches |
| /student/feedback | feedback.jsx | Partial (no backend) | None |
| /student/notifications | notifications.jsx | Done (localStorage only) | None |
| /student/profile | profile.jsx | Partial | /api/v1/users |

### 7B. Trainer Portal (/trainer/*)
Auth: currentUser.role === "teacher", else redirect to /

| Route | Page | Status | APIs |
|---|---|---|---|
| /trainer | TeacherDashboard.jsx | Done | batches, assessments, users |
| /trainer/assessment-builder | AssessmentBuilder.jsx | Done | /api/v1/assessments |
| /trainer/batches | BatchManagement.jsx | Done | batches, users |
| /trainer/batches/:id | BatchDetail.jsx | Done | batches, submissions |
| /trainer/evaluation | Evaluation.jsx | Done | submissions, assessments |
| /trainer/leaderboard | Leaderboard.jsx | Done | submissions, users |
| /trainer/reports | Reports.jsx | Done | assessments, submissions |
| /trainer/settings | Settings.jsx | Done | /api/v1/users |

### 7C. Admin Portal (/admin/*)
Auth: teacher or admin role

| Route | Status | Description |
|---|---|---|
| /admin | Done | Admin dashboard |
| /admin/organiser | Done | Course organiser (hierarchy builder) |
| /admin/curriculum | Done | Curriculum view |
| /admin/categories | Done | Category CRUD |
| /admin/courses | Done | Course CRUD |
| /admin/courses/builder | Done | Course builder with modules/submodules/content |
| /admin/submodules/:id/content | Done | Content block editor |
| /admin/trainer | Done | Trainer management |
| /admin/analytics/* (16 pages) | Partial | Rich charts built; all use mock data, not live APIs |

### 7D. Login / Public
| Route | Component | Description |
|---|---|---|
| / | index.jsx | Redirects to /login |
| /login | Login.jsx | Role selector (Trainer/Student/Admin) + email auth |

---

## 8. FRONTEND ROUTES MAP

| Path | Component | Protected | APIs |
|---|---|---|---|
| / | index.jsx | No | — |
| /login | Login.jsx | No | /api/v1/users, /api/v1/batches |
| /student | StudentDashboard.jsx | Yes (student) | assessments, submissions |
| /student/assessments | StudentAssessments.jsx | Yes (student) | assessments, batches |
| /student/assessment/:id | AssessmentDetail.jsx | Yes (student) | assessments |
| /student/take/:slug | TakeQuiz.jsx | Yes (student) | assessments, submissions, drafts |
| /student/take-coding/:slug | TakeCoding.jsx | Yes (student) | assessments, submissions |
| /student/results | results/index.jsx | Yes (student) | submissions |
| /student/results/:slug/:id | Results.jsx | Yes (student) | submissions, assessments |
| /student/certificate/:id | CertificateView.jsx | Yes (student) | submissions |
| /student/courses | courses.jsx | Yes (student) | /courses, /categories, /enrollments |
| /student/course/:courseId | course/.jsx | Yes (student) | /courses/hierarchy, /progress |
| /student/batches | batches.jsx | Yes (student) | /api/v1/batches |
| /student/feedback | feedback.jsx | Yes (student) | None |
| /student/notifications | notifications.jsx | Yes (student) | None |
| /student/profile | profile.jsx | Yes (student) | /api/v1/users |
| /trainer | TeacherDashboard.jsx | Yes (teacher) | batches, assessments, users |
| /trainer/assessment-builder | AssessmentBuilder.jsx | Yes (teacher) | /api/v1/assessments |
| /trainer/batches | BatchManagement.jsx | Yes (teacher) | batches, users |
| /trainer/batches/:id | BatchDetail.jsx | Yes (teacher) | batches, submissions |
| /trainer/evaluation | Evaluation.jsx | Yes (teacher) | submissions, assessments |
| /trainer/leaderboard | Leaderboard.jsx | Yes (teacher) | submissions, users |
| /trainer/reports | Reports.jsx | Yes (teacher) | assessments, submissions |
| /trainer/settings | Settings.jsx | Yes (teacher) | users |
| /admin | admin/index.jsx | Yes (teacher) | various |
| /admin/organiser | organiser.jsx | Yes | courses, categories |
| /admin/categories | categories/index.jsx | Yes | /categories |
| /admin/categories/:slug | categories/.jsx | Yes | /categories/:id |
| /admin/courses | courses/index.jsx | Yes | /courses, /categories |
| /admin/courses/builder | courses/builder.jsx | Yes | /courses, /categories |
| /admin/courses/:slug | courses/.jsx | Yes | /courses/:id/hierarchy |
| /admin/curriculum | curriculum.jsx | Yes | /courses |
| /admin/analytics/* | 16 pages | Yes | mock data |
| /admin/trainer | trainer.js | Yes | /api/v1/users |

---

## 9. STATE MANAGEMENT

### LMSContext (src/context/LMSContext.jsx)
Primary global state. Wrapped at root, consumed via useLMS().

| Slice | Type | Source |
|---|---|---|
| teachers | Array<User> | Backend /api/v1/users |
| students | Array<User> | Backend /api/v1/users |
| batches | Array<Batch> | Backend /api/v1/batches |
| assessments | Array<Assessment> | Backend /api/v1/assessments |
| submissions | Array<Submission> | Backend /api/v1/submissions |
| codingSubmissions | Array | localStorage |
| codingLeaderboard | Array | localStorage |
| notifications | Array | localStorage |
| currentUser | User|null | localStorage("session") |
| theme | "light"/"dark" | localStorage("settings") |

### Data Flow
1. App starts -> LMSContext useEffect fetches all backend data
2. Login: login(email, role) finds user in loaded list -> sets currentUser -> persisted to localStorage
3. Route protection: Layout routes read currentUser.role -> redirect if mismatch

### localStorage Keys
session, settings, teachers, students, batches, assessments, submissions, codingSubmissions, codingLeaderboard, codingAssessments, codingProblems, codingTemplates, codingTestCases, codingResults, notifications

---

## 10. ENVIRONMENT & CONFIG

### Frontend (.env)
| Variable | Purpose |
|---|---|
| VITE_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| VITE_CLOUDINARY_UPLOAD_PRESET | Cloudinary upload preset |
| VITE_GROQ_API_KEY | Groq LLM API key |
| VITE_API_BASE_URL | Backend URL (default: http://localhost:8080/api) |

### Backend (backend/.env + docker-compose)
| Variable | Purpose |
|---|---|
| JWT_SECRET | JWT signing secret (>=32 chars) |
| ADMIN_PASSWORD | Admin password (not yet wired to auth) |
| SERVER_PORT | Service listen port |
| DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD | PostgreSQL connection |
| REDIS_HOST | Redis hostname |
| SERVICES_COURSE, SERVICES_USER, SERVICES_BATCH, SERVICES_ASSESSMENT | Gateway routing URLs |

### Hardcoded Values
| Value | Location | Notes |
|---|---|---|
| TEMPORARY_STUDENT_ID = "00000000-0000-0000-0000-000000000001" | src/config/student-identity.js | X-User-Id header placeholder |
| X-Tenant-Id: "123e4567-e89b-12d3-a456-426614174000" | src/services/api.js | Hardcoded tenant |
| Vite proxy /api -> localhost:8080 | vite.config.js | Dev-only |

---

## 11. KNOWN ISSUES / INCOMPLETE AREAS

| # | Issue | Location |
|---|---|---|
| 1 | Auth is fake — email matching only, no password, no JWT | LMSContext.jsx:234 |
| 2 | Admin role tab on login has no real admin user concept | Login.jsx |
| 3 | TEMPORARY_STUDENT_ID hardcoded | src/config/student-identity.js:12 |
| 4 | X-Tenant-Id hardcoded | src/services/api.js:11 |
| 5 | 16 analytics pages use mock data, not live APIs | src/routes/admin/analytics/* |
| 6 | Coding test case execution is simulated | src/pages/TakeCoding.jsx |
| 7 | EnrollmentController comment says auth not implemented | EnrollmentController.java:13 |
| 8 | Kafka referenced in course-service but no Kafka container | docker-compose.yml |
| 9 | render.yaml only has 2 of 5 services | render.yaml |
| 10 | implementation_plan.md leftover in root | d:\Xebia Integrated\implementation_plan.md |
| 11 | Empty Xebia LMS ghost folder exists (IDE lock) | d:\Xebia Integrated\Xebia LMS\ |
| 12 | Student feedback form has no backend endpoint | /student/feedback |
| 13 | Notifications are localStorage-only, no backend | /student/notifications |

---

## 12. NEXT DEVELOPMENT PRIORITIES

### Critical
1. Implement real JWT authentication — replace fake email matching with login endpoint + JWT token
2. Replace TEMPORARY_STUDENT_ID with JWT-derived user ID

### High Priority (Backend)
3. Wire 16 analytics pages to real aggregated data from backend
4. Implement real code execution engine for coding assessments (Judge0 or custom)
5. Add missing services (user, batch, assessment) to render.yaml
6. Add Kafka broker and implement enrollment/completion events

### Medium Priority (Frontend)
7. Implement student feedback form backend endpoint
8. Real notification system (not localStorage)
9. Profile editing connected to PUT /api/v1/users/:id (endpoint missing)
10. Verify course progress tracking works end-to-end in student dashboard

### Low Priority / Polish
11. Delete empty Xebia LMS ghost folder after closing VS Code
12. Remove implementation_plan.md from project root
13. Add pagination to all list endpoints
14. GitHub Actions CI/CD workflow
15. Database seed script for demo data

---

## 13. SESSION LOG

### Session 2026-07-14 — Major Integration and Cleanup

What was done:
- Fixed Rules of Hooks violations in TakeQuiz.jsx and TakeCoding.jsx
- Fixed vite.config.js Nitro preset from cloudflare to node-server/vercel conditional
- Removed legacy Xebia-Student-Trainer folder; unified all code under Xebia Integrated
- Moved all project files from Xebia Integrated/Xebia LMS/ up to root
- Deleted 200+ legacy files (temp scripts, migration scripts, scratch/, dist_check/, ui design/ etc)
- Fixed login page: logo-dark.png (404) -> logo-white.png; text color fixed to text-purple-200
- Verified npm run build succeeds from new root location (~5 seconds)
- Set git config user.name=mritunjai-prog, user.email=mritunjay045k@gmail.com
- Pushed all changes to branch lms-integrate on GitHub
- Created memory.md (this file)

Servers: Frontend npm run dev on :3000, Backend docker-compose up -d (7 containers healthy)
