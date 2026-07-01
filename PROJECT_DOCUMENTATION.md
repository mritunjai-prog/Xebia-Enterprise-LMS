
# Xebia Enterprise LMS - Project Documentation

## 1. Project Overview

This project is an Enterprise Learning Management System (LMS) designed for various roles: Administrators, Organisers, Trainers, and Students. It provides comprehensive course building, enrollment, progress tracking, and media delivery capabilities.

## 2. Technology Stack

**Frontend:**

- **Framework:** React 18, Vite
- **Routing:** Tanstack Router (`@tanstack/react-router`)
- **State & Data Fetching:** Zustand (Global State), Tanstack Query (`@tanstack/react-query`) for cached data
- **Styling:** Tailwind CSS, Framer Motion (animations), Radix UI/Shadcn (components)
- **Media Hosting:** Cloudinary

**Backend:**

- **Framework:** Java Spring Boot 3 (Microservices Architecture)
- **API Gateway:** Spring Cloud Gateway (Port 8080) routes frontend requests to microservices.
- **Database:** PostgreSQL (Database: `lms`, Schema: `course`)
- **ORM:** Hibernate / Spring Data JPA
- **Messaging/Events:** Kafka (Configured, ready for async event processing)
- **Infrastructure:** Docker Compose (local environment)

## 3. Architecture & Working

The system follows a strict client-server microservices architecture:

1. **Frontend (`d:\Xebia LMS\src`)**:
   - `admin/pages`: Interfaces for building courses (`HierarchyBuilder.jsx`, `ContentManager.jsx`).
   - `routes/student`: The student portal, utilizing React Query for fetching and displaying the curriculum, video embeds, and PDF viewers (`$courseId.jsx`).
   - `services/api.js`: Centralized API wrapper using native `fetch` to communicate with the API Gateway.
2. **API Gateway (`backend/api-gateway`)**:
   - Runs on `http://localhost:8080`.
   - Strips `/api` prefixes and routes requests. For example, `/api/courses/**` is forwarded to `course-service` at `http://localhost:8084/courses/**`.
   - Handles global CORS configuration.
3. **Course Service (`backend/course-service`)**:
   - Handles the entire LMS structural hierarchy and persistence.
   - Provides RESTful endpoints for CRUD operations on Courses, Modules, Submodules, and Content Items.
   - Endpoint examples: `POST /courses/{courseId}/modules`, `DELETE /courses/content-items/{contentId}`, `GET /courses/{courseId}/hierarchy`.

## 4. Data Schema (Core Hierarchy)

The PostgreSQL database revolves around a nested tree structure for learning paths. All entities are tenant-scoped (`tenant_id`).

1. **`courses`**:
   - Fields: `id` (UUID), `title`, `description`, `published`, `slug`, `category`, `level`, `duration`, etc.
2. **`course_modules`**:
   - Fields: `id`, `course_id`, `title`, `position`, `description`, `is_active`.
   - Represents the highest level container inside a course.
3. **`submodules`** (Often referred to as "Lessons" in the UI):
   - Fields: `id`, `module_id`, `title`, `position`, `slug`, `meta_title`, `description`.
4. **`content_items`** (The actual content blocks):
   - Fields: `id`, `course_id`, `module_id`, `submodule_id`, `title`, `type` (e.g. NOTE, VIDEO_REFERENCE, PDF), `storage_ref` (JSON string storing media URLs and UI formatting metadata), `position`.
5. **Progress Tracking**:
   - `enrollments`, `course_progress`, `content_progress` tables track student progression. They employ `ON DELETE CASCADE` foreign keys attached to the core hierarchy to maintain referential integrity.

## 5. Recent Work & Fixes (Context for Continued Development)

If you are continuing development, please note the recent structural fixes that have been implemented:

- **Frontend-Backend Integration**: The frontend Admin portal (`HierarchyBuilder.jsx`, `ContentManager.jsx`) was refactored to use real backend REST APIs (`CourseController.java`) instead of local mock state arrays. All creates, updates, and deletes now persist to the PostgreSQL database.
- **Cascading Deletions**: In `CourseService.java`, deleting a `CourseModule` or `SubModule` will explicitly and permanently delete all nested `SubModules` and `ContentItems` associated with it.
- **Cloudinary 401 Fix**: Previously, uploading PDFs threw a `401 Unauthorized` error because Cloudinary's default image delivery API restricted raw documents. This was fixed by using the `/auto/upload` endpoint in `ContentManager.jsx` so Cloudinary correctly processes PDFs as raw files and MP4s as videos.
- **Browser Caching Bug**: The frontend suffered from aggressive native `fetch` caching, causing deleted content items to "reappear" when the user refreshed the admin dashboard. This was solved by injecting `{ cache: 'no-store' }` into the GET requests inside `api.js` (e.g., `getCourseHierarchy`).

## 6. How to Run Locally

### Starting the Backend (Microservices)

The backend is completely containerized. You must have Docker and Docker Compose installed.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd "d:\Xebia LMS\backend"
   ```
2. Run the following command to build and start all microservices (PostgreSQL, Kafka, API Gateway, Course Service) in the background:
   ```bash
   docker compose up -d --build
   ```
3. The API Gateway will be available at `http://localhost:8080`.

### Starting the Frontend

The frontend is a Vite application. You must have Node.js and npm installed.

1. Open a terminal and navigate to the root directory:
   ```bash
   cd "d:\Xebia LMS"
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be accessible at `http://localhost:3000`.

## 7. Guide for the Codex LLM

- **State Management**: When updating React components, always ensure that frontend state stays in sync with backend mutations. Use `api.js` for data fetching.
- **Styling**: Stick to standard Tailwind CSS class names. Re-use existing UI components where possible instead of building from scratch.
- **Backend Mods**: If you modify `course-service` logic, ensure you respect the `TenantContext` pattern currently in place for multi-tenant data isolation.
