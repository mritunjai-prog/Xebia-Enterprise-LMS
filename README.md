<h1 align="center">
  <img src="https://img.icons8.com/clouds/100/000000/learning.png" alt="LMS Logo" width="100"/>
  <br/>
  <b>Xebia Enterprise LMS</b>
</h1>

<p align="center">
  <strong>A production-grade, full-stack Learning Management System</strong><br/>
  Built with React 19, Spring Boot 3.3, and PostgreSQL — deployed on Vercel + Render.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-00D8FF?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring_Boot-3.3.6-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge&logo=ai&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
</p>

<p align="center">
  <a href="https://xebia-enterprise-lms.vercel.app" target="_blank"><strong>🌐 Live Demo</strong></a> •
  <a href="setup.md"><strong>📖 Setup Guide</strong></a> •
  <a href="ARCHITECTURE.md"><strong>🏗️ Architecture Docs</strong></a> •
  <a href="API.md"><strong>⚙️ API Reference</strong></a>
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Live Links](#-live-links)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Microservices Architecture](#-microservices-architecture)
- [Project Structure](#-project-structure)
- [Portal Walkthroughs](#-portal-walkthroughs)
  - [Admin Portal](#admin-portal)
  - [Student Portal](#student-portal)
  - [Analytics Suite](#analytics-suite)
- [Quick Start](#-quick-start)
- [Meet the Team](#-meet-the-team)

---

## 🌟 About the Project

**Xebia Enterprise LMS** is a full-stack, production-deployed Learning Management System built for enterprise training at scale. It powers **two distinct user portals** — a feature-rich **Admin Portal** for course architects and platform administrators, and a beautifully designed **Student Portal** for learners — all running on a scalable Java microservices backend.

The platform was built over several weeks of intensive development and covers the full LMS lifecycle: from AI-assisted content creation and deep curriculum hierarchy building, all the way to student enrolment, course playback, assessments, and a 7-page enterprise analytics suite.

---

## 🔗 Live Links

| Service | URL |
|---|---|
| 🎓 Frontend (Vercel) | https://xebia-enterprise-lms.vercel.app |
| ⚙️ API Gateway (Render) | https://xebia-api-gateway-mritunjai.onrender.com |
| 📦 Course Service (Render) | https://xebia-course-service-mritunjai.onrender.com |

---

## 🔥 Key Features

### 🛡️ Admin Portal
- **AI-Powered Course Creation** — Uses Groq API to auto-generate course descriptions, learning outcomes, prerequisites, and complete curriculum outlines.
- **Advanced Curriculum Builder** — A fully drag-and-drop hierarchy with 4 levels: Courses → Modules → Submodules → Content Blocks. Supports reordering, renaming, editing, and deletion.
- **Category Management** — Create, edit, and browse categories with image uploads (Cloudinary), subcategories, and linked course previews.
- **Content Manager** — Rich text content blocks per submodule, supporting video, text, and interactive item types.
- **Profile Settings** — Admins can update their avatar, name, and email directly from the platform header.

### 🎓 Student Portal
- **Personalized Learning Dashboard** — Welcome banner, quick-action cards, stat tiles, and interactive charts for learning activity and subject performance.
- **Course Catalogue** — Browse, search, and filter all available courses with card-style previews.
- **Course Playback** — Full curriculum sidebar with module/submodule navigation and content rendering per section.
- **Assessments** — View and take assessments linked to enrolled courses.
- **Results & Feedback** — Review assessment results and submit course feedback.
- **Notifications Centre** — Receive and manage platform notifications.
- **Profile Page** — Student profile overview.

### 📊 Analytics Suite (7 Pages)
- **Executive Dashboard** — High-level KPI overview with engagement trends and completion metrics.
- **AI Transformation Report** — Tracks AI-generated vs. manually created courses and content adoption.
- **Certifications Overview** — Certification issuance trends across cohorts.
- **Coverage Map** — Course coverage across departments and disciplines.
- **Flagship Programs** — Key programme summaries with cohort data.
- **Learning Hours** — Time-in-learning metrics by team, role, and date range.
- **Learning Pillars** — Visualizes content structured around company learning pillars.

### 🏗️ Infrastructure
- **API Gateway (Spring Cloud)** — Routes frontend traffic to the correct microservice.
- **Flyway Database Migrations** — Fully versioned and automated schema management.
- **Dockerized PostgreSQL** — Reproducible local database via `docker-compose`.
- **Mobile Responsive UI** — CSS breakpoints for tablets and phones, with a sliding mobile sidebar.

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | TanStack Router (type-safe file-based routing) |
| Server State | TanStack Query (data fetching & caching) |
| Global State | Zustand |
| Styling | Tailwind CSS + Custom Design Tokens (Purple/Teal theme) |
| Animations | Framer Motion |
| AI | Groq SDK (`llama-3.3-70b-versatile` model) |
| Media | Cloudinary Upload API |
| Charts | Recharts |
| Icons | Lucide React |

### Backend
| Category | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.3.6 |
| API Layer | Spring Web MVC (REST) |
| Database ORM | Spring Data JPA + Hibernate |
| Migrations | Flyway |
| Database | PostgreSQL 15 |
| Gateway | Spring Cloud Gateway |
| Build Tool | Apache Maven |

### DevOps / Deployment
| Category | Technology |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Render (Web Services) |
| Database Hosting | Render PostgreSQL (Free Tier) |
| Local DB | Docker Compose |
| CI/CD | GitHub → Vercel Auto Deploy, GitHub → Render Deploy Hooks |

---

## 🏗️ Microservices Architecture

```
Browser (Vercel Frontend)
         │
         ▼
  ┌─────────────────────────────┐
  │   API Gateway (Port 8080)   │  ← Routes all /api/* requests
  └─────────────┬───────────────┘
                │
                ▼
  ┌─────────────────────────────┐
  │  Course Service (Port 8084) │  ← Core business logic
  │                             │    Courses, Categories,
  │                             │    Modules, Submodules,
  │                             │    Content, Enrollments
  └─────────────┬───────────────┘
                │
                ▼
  ┌─────────────────────────────┐
  │  PostgreSQL Database        │  ← Schema: course.*
  │  (Docker / Render)          │    Managed by Flyway
  └─────────────────────────────┘
```

### API Gateway Routes
| Incoming Request | Forwards To |
|---|---|
| `GET /api/courses/**` | Course Service |
| `GET /api/categories/**` | Course Service |
| `GET /api/modules/**` | Course Service |
| `GET /api/enrollments/**` | Course Service |
| `GET /api/health` | API Gateway Health |

---

## 📁 Project Structure

```
Xebia-Enterprise-LMS/
├── 📁 src/                          # React Frontend Source
│   ├── 📁 routes/                   # TanStack file-based routing
│   │   ├── __root.jsx               # Root layout (Sidebar + Header)
│   │   ├── index.jsx                # Admin Dashboard (/)
│   │   ├── 📁 admin/                # Admin-only routes
│   │   │   ├── 📁 analytics/        # 7 analytics sub-pages
│   │   │   ├── 📁 categories/       # Category management pages
│   │   │   ├── 📁 courses/          # Course detail pages
│   │   │   └── 📁 curriculum/       # Curriculum builder pages
│   │   ├── 📁 student/              # Student portal routes
│   │   │   ├── index.jsx            # Student dashboard
│   │   │   ├── courses.jsx          # Course catalogue
│   │   │   ├── assessments.jsx      # Assessments listing
│   │   │   ├── results.jsx          # Assessment results
│   │   │   ├── feedback.jsx         # Course feedback
│   │   │   ├── notifications.jsx    # Notifications centre
│   │   │   └── 📁 course/           # Course playback
│   │   └── organiser.jsx            # Organiser/Trainer portal
│   ├── 📁 admin/                    # Admin page components
│   │   ├── 📁 pages/                # Dashboard, Courses, Categories, Curriculum
│   │   ├── 📁 components/           # Shared UI, layout (Sidebar, Header)
│   │   ├── index.css                # Admin design tokens & layout CSS
│   │   └── responsive.css           # Mobile responsiveness breakpoints
│   ├── 📁 components/               # Global components
│   │   ├── 📁 layout/               # Student sidebar & navbar
│   │   └── cursor-trail.jsx         # Premium cursor trail effect
│   ├── 📁 features/                 # Feature-scoped modules
│   │   └── 📁 student/              # Student dashboard widgets & charts
│   ├── 📁 services/                 # API service layer
│   │   └── api.js                   # Axios calls to API Gateway
│   └── 📁 lib/                      # Utilities (Groq AI, store, helpers)
│
├── 📁 backend/                      # Java Backend Monorepo
│   ├── 📁 api-gateway/              # Spring Cloud Gateway (Port 8080)
│   ├── 📁 course-service/           # Core service (Port 8084)
│   │   └── 📁 db/migration/         # Flyway SQL migrations (V1–V10.2)
│   ├── 📁 common-lib/               # Shared DTOs and utilities
│   ├── docker-compose.yml           # Local PostgreSQL setup
│   └── pom.xml                      # Parent Maven build file
│
├── README.md                        # This file
├── setup.md                         # Complete local setup guide
├── API.md                           # API endpoints reference
└── ARCHITECTURE.md                  # Deep architecture documentation
```

---

## 🚀 Quick Start

> **👉 For a full, beginner-friendly step-by-step setup guide (with Java installation, Docker setup, and environment variables), please read the [Complete SETUP.md Guide](setup.md).**

### Prerequisites
- Node.js 18+ and npm
- Java 21 (JDK)
- Apache Maven 3.9+
- Docker Desktop (running)

### 1. Clone
```bash
git clone https://github.com/mritunjai-prog/Xebia-Enterprise-LMS.git
cd Xebia-Enterprise-LMS
```

### 2. Start the Backend (Database + Microservices)
```bash
cd backend
docker compose up --build -d
```

### 3. Start Frontend
```bash
# In project root (Terminal 3)
npm install
npm run dev
```

### 4. Create your `.env` file in the root
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_GROQ_API_KEY=your_groq_api_key
```

Open `http://localhost:5173` — you're in! 🎉

---

## 🖥️ Portal Walkthroughs

### Admin Portal
The admin portal (`/`) is the control centre for platform administrators. It features:
- A collapsible **Sidebar** with dark mode support.
- **Dashboard** with live KPI metrics and course/category overviews.
- **Courses** module — Create, list, edit courses; build a full 4-level curriculum hierarchy.
- **Categories** module — Organise courses by category with image uploads and AI-generated descriptions.
- **Analytics** menu — 7 sub-pages providing enterprise learning analytics with charts and data tables.

### Student Portal
The student portal (`/student`) is a dedicated, fully separate experience:
- A **dark purple sidebar** with independent navigation, profile, and settings.
- **Dashboard** with personalized metrics, activity charts, and quick action cards.
- **Course Catalogue** — Browse enrolled and available courses with search and filter.
- **Course Playback** — Full video/content viewer with curriculum sidebar navigation.
- **Assessments** — Take quizzes and assessments tied to courses.
- **Results, Feedback, and Notifications** — Post-course activities.

### Analytics Suite
Accessible from the Admin sidebar under "Analytics", this 7-page suite provides:
- **Executive**: Top-level KPI cards — completions, certifications, NPS, hours.
- **Coverage**: Heatmap-style view of content coverage across the organization.
- **Hours**: Learning hours tracked by team, role, and time range.
- **AI Transformation**: Metrics on AI-generated vs. manual content.
- **Flagship Programs**: Key program enrolment and performance summaries.
- **Certifications**: Certification completion trends over time.
- **Pillars**: Learning content organised by enterprise learning pillars.

---

## 👥 Meet the Team

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/mritunjai-prog">
        <img src="https://github.com/mritunjai-prog.png" width="90px;" alt="Mritunjai Singh"/><br/>
        <b>Mritunjai Singh</b>
      </a><br/>
      <sub>Full Stack Lead</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Abhijeet0Tiwari">
        <img src="https://github.com/Abhijeet0Tiwari.png" width="90px;" alt="Abhijeet Tiwari"/><br/>
        <b>Abhijeet Tiwari</b>
      </a><br/>
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ManishKumawat450">
        <img src="https://github.com/ManishKumawat450.png" width="90px;" alt="Manish Kumawat"/><br/>
        <b>Manish Kumawat</b>
      </a><br/>
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Vijay-Menaria">
        <img src="https://github.com/github.png" width="90px;" alt="Vijay Menaria"/><br/>
        <b>Vijay Menaria</b>
      </a><br/>
      <sub>UI/UX Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Vinit1120">
        <img src="https://github.com/github.png" width="90px;" alt="Vinit Menaria"/><br/>
        <b>Vinit Menaria</b>
      </a><br/>
      <sub>Backend Developer</sub>
    </td>
  </tr>
</table>

---

<div align="center">
  <p>⭐ Star this repository if you found it useful!</p>
  <p>Built with ❤️ by the Xebia LMS Team</p>
</div>
