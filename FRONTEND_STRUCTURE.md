# Xebia Enterprise LMS - Frontend Architecture & Workflow Documentation

This document provides a comprehensive analysis of the Xebia Enterprise LMS frontend, specifically for the `mritunjai-duplicate-lms` branch. It is structured to be easily parsed by AI tools like Miro or ExcelDraw for creating wireframes, mind maps, and workflow diagrams.

---

## 1. Hierarchical Outline (Routes & Pages)

### A. Core Shell
- **Root Layout (`__root.jsx`)**
  - **Sidebar** (Role-based: Admin vs. Student)
  - **Header** (Search, Notifications, Profile)
  - **Main Content Area** (TanStack Router Outlet)

### B. Admin Portal (Path: `/`)
- **Dashboard (`/`)** - Overview of platform metrics.
- **Categories (`/categories/`)** - Grouping courses by domain.
  - **Category Detail (`/categories/$categorySlug`)** - Individual category management.
- **Courses (`/courses/`)** - Primary learning content repository.
  - **Course Detail (`/courses/$courseSlug`)** - Stats and overview.
  - **Course Builder (`/courses/builder`)** - Interactive curriculum editor.
- **Curriculum (`/curriculum`)** - High-level syllabus organizer.
- **Analytics (`/analytics/`)** - Platform-wide data visualization.

### C. Student Portal (Path: `/student`)
- **Student Dashboard (`/student/`)** - Personal learning overview.
- **My Courses (`/student/courses`)** - User-enrolled courses list.
- **Course Viewer (`/student/course/$courseId`)** - Immersive learning interface.
  - **Preview State** - Course landing page.
  - **Active Learning State** - Video/PDF player + Progress tracking.
- **Assessments (`/student/assessments`)** - Testing and evaluation.
- **Results (`/student/results`)** - Performance feedback.
- **Profile (`/student/profile`)** - Student identity and settings.

---

## 2. UI Elements & Clickable Actions

### Admin Dashboard
- **KPI Cards:** Total Courses, Categories, Published, Under Construction.
- **Recent Courses:** Quick access cards with "View All" link.
- **Quick Creator Tiles:** Buttons for "New Category", "New Course", and "Organiser".

### Course Builder (Interactive)
- **Hierarchy Tree:**
  - **Module Card:** Expandable section.
    - *Action:* Add Module, Edit Title/Desc, AI Generate, Delete.
  - **Submodule Card:** Nested under Module.
    - *Action:* Add Submodule, Reorder, SEO Metadata Toggle.
  - **Content Blocks:** Video, Text, PDF, Code.
    - *Action:* Add Content, reorder, Edit storage reference.
- **AI Tooling:** "Generate with AI" button for descriptions.

### Student Course Viewer
- **Polymorphic Player:** Supports YouTube/Vimeo (Video), Cloudinary (PDF), Code blocks, and HTML (Text).
- **Sticky Curriculum Sidebar:** List of modules/submodules with progress indicators (Checkmarks).
- **Navigation Controls:** "Previous", "Next", and "Mark Complete" buttons.

---

## 3. API & Backend Mappings

| Frontend Action | API Service (`src/services/api.js`) | Backend Endpoint |
| :--- | :--- | :--- |
| Load Dashboard | `CourseService.getCourses` | `GET /api/courses` |
| Create Course | `CourseService.createCourse` | `POST /api/courses` |
| Build Hierarchy | `CourseService.addModule` | `POST /api/courses/{id}/modules` |
| AI Text Gen | `AIService.generateBriefDescription` | AI Utility Service |
| Student Enrollment| `EnrollmentService.enroll` | `POST /api/enrollments/{id}` |
| Progress Update | `ProgressService.markComplete` | `POST /api/progress/course/...` |
| Fetch Profile | `AuthService.getProfile` | `GET /api/iam/me` |

---

## 4. Robust Workflows

### Workflow 1: Admin Content Lifecycle (Creator Path)
1. **Initiation:** Admin clicks "New Course" from Dashboard.
2. **Metadata Setup:** Enters Title, Slug, Category, and Difficulty Level.
3. **Curriculum Design:** Navigates to Builder -> Creates Modules.
4. **AI Enrichment:** Clicks "AI Generate" to populate submodule descriptions.
5. **Asset Upload:** Links Video URLs or PDF documents to Submodules.
6. **Publication:** Toggles "Published" status to make it visible to students.

### Workflow 2: Student Learning Journey (Consumer Path)
1. **Discovery:** Student browses "My Courses" or views "Jump Back In" on Dashboard.
2. **Engagement:** Clicks a course -> Enters Course Viewer.
3. **Consumption:** Watches video or reads PDF content in the player.
4. **Validation:** Clicks "Mark Complete" -> Backend updates progress percentage.
5. **Persistence:** TanStack Query caches the state -> Progress bar updates in real-time.

---

## 5. Structured Data (JSON for AI Tools)

```json
{
  "project": "Xebia Enterprise LMS",
  "branch": "mritunjai-duplicate-lms",
  "hierarchy": {
    "Admin": {
      "Dashboard": ["/"],
      "Courses": {
        "List": "/courses",
        "Detail": "/courses/:slug",
        "Builder": "/courses/builder"
      },
      "Categories": "/categories",
      "Curriculum": "/curriculum",
      "Analytics": "/analytics"
    },
    "Student": {
      "Dashboard": "/student",
      "MyCourses": "/student/courses",
      "Viewer": "/student/course/:id",
      "Assessments": "/student/assessments",
      "Profile": "/student/profile"
    }
  },
  "actions": [
    "enroll_course",
    "complete_submodule",
    "generate_ai_content",
    "create_hierarchy",
    "toggle_publish_status"
  ],
  "services": [
    "CourseService",
    "CategoryService",
    "EnrollmentService",
    "ProgressService",
    "AIService"
  ]
}
```
