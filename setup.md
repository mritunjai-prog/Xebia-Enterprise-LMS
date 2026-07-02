# 📖 Ultimate Setup Guide — Xebia Enterprise LMS

> **This guide is designed to be completely foolproof. Follow every single step in order, and you will have the full platform running on your computer — even if you have never written Java or used Docker before.**

---

## 📑 Table of Contents

1. [What You Are Setting Up](#1-what-you-are-setting-up)
2. [Phase 1 — Install Core Prerequisites](#phase-1--install-core-prerequisites)
   - [1.1 Install Java 21 (JDK)](#11-install-java-21-jdk)
   - [1.2 Install Apache Maven](#12-install-apache-maven)
   - [1.3 Install Node.js & npm](#13-install-nodejs--npm)
   - [1.4 Install Docker Desktop](#14-install-docker-desktop)
   - [1.5 Install Git](#15-install-git)
3. [Phase 2 — Clone the Repository](#phase-2--clone-the-repository)
4. [Phase 3 — Start the Backend (Database + Microservices)](#phase-3--start-the-backend-database--microservices)
5. [Phase 4 — Configure Environment Variables](#phase-4--configure-environment-variables)
6. [Phase 5 — Run the Frontend](#phase-5--run-the-frontend)
7. [Phase 6 — Access the Platform](#phase-6--access-the-platform)
9. [Understanding the Application](#understanding-the-application)
   - [Admin Portal](#admin-portal-overview)
   - [Student Portal](#student-portal-overview)
   - [Analytics Suite](#analytics-suite-overview)
10. [Deployment Guide (Render + Vercel)](#deployment-guide-render--vercel)
11. [Troubleshooting Guide](#troubleshooting-guide)

---

## 1. What You Are Setting Up

This project is a **full-stack application** split into three separate pieces that must all run together:

| Piece | What It Is | Technology | Port |
|---|---|---|---|
| **Database** | Stores all data (courses, categories, modules, students) | PostgreSQL (inside Docker) | 5432 |
| **Backend** | The server that handles all business logic and API requests | Java + Spring Boot | 8080, 8084 |
| **Frontend** | The visual user interface in your browser | React + Vite | 5173 |

Think of it like a restaurant: the Database is the kitchen storage, the Backend is the chef, and the Frontend is the menu/waiter that you, the user, interact with.

---

## Phase 1 — Install Core Prerequisites

Open your terminal (**PowerShell** on Windows, **Terminal** on Mac) for all of the commands below.

---

### 1.1 Install Java 21 (JDK)

The backend is written in Java. You need the **Java Development Kit (JDK)** version 21.

**Step 1:** Go to the [Adoptium OpenJDK 21 Downloads Page](https://adoptium.net/temurin/releases/?version=21).

**Step 2:** Choose your operating system:
- **Windows:** Download `Temurin 21 (LTS)` → `Windows` → `x64` → `.msi` file
- **macOS (Apple Silicon):** Download the `aarch64` `.pkg` file
- **macOS (Intel):** Download the `x64` `.pkg` file

**Step 3:** Run the downloaded installer. Accept all defaults.

**Step 4:** Verify the installation. Open a **new** terminal and type:
```bash
java -version
```
✅ **Expected output:**
```
openjdk version "21.0.x" 2024-...
OpenJDK Runtime Environment Temurin-21...
```

❌ **If you get "java is not recognized as a command":** You need to add Java to your PATH.
- **Windows:** Search "Environment Variables" in the Start Menu → Click "Edit the system environment variables" → Click "Environment Variables..." → Under "System variables", find `Path` → Click "Edit" → Click "New" → Type `C:\Program Files\Eclipse Adoptium\jdk-21.x.x.x-hotspot\bin` (adjust based on where it was installed) → Click OK on everything.

---

### 1.2 Install Apache Maven

Maven is the build tool that compiles our Java code and downloads its dependencies.

**Step 1:** Go to the [Maven Download Page](https://maven.apache.org/download.cgi).

**Step 2:** Under "Files", download the `Binary zip archive` (e.g., `apache-maven-3.9.6-bin.zip`).

**Step 3:** Extract the ZIP file to a permanent location:
- **Windows:** Extract to `C:\Program Files\apache-maven`
- **Mac/Linux:** Extract to `/usr/local/apache-maven`

**Step 4: Add Maven to your PATH**
- **Windows:**
  1. Open Start Menu → Search "Edit the system environment variables"
  2. Click "Environment Variables..."
  3. Under "System variables", find and click `Path` → Click "Edit"
  4. Click "New"
  5. Type the full path to the Maven `bin` folder, e.g.: `C:\Program Files\apache-maven\bin`
  6. Click OK on all windows.
  7. **Important:** Close and reopen all your terminal windows.

- **Mac/Linux:** Add this line to your `~/.zshrc` or `~/.bashrc`:
  ```bash
  export PATH="/usr/local/apache-maven/bin:$PATH"
  ```
  Then run: `source ~/.zshrc`

**Step 5:** Verify. Open a **new** terminal and type:
```bash
mvn -version
```
✅ **Expected output:**
```
Apache Maven 3.9.6
Java version: 21.0.x
```

---

### 1.3 Install Node.js & npm

Node.js runs our React frontend.

**Step 1:** Go to [Nodejs.org](https://nodejs.org/).

**Step 2:** Click the big green **"LTS" (Long Term Support)** button. Download the installer for your OS.

**Step 3:** Run the installer. Leave all settings on their defaults. Click Next until it finishes.

**Step 4:** Verify:
```bash
node -v
npm -v
```
✅ **Expected output:**
```
v20.x.x     ← node version
10.x.x      ← npm version
```

---

### 1.4 Install Docker Desktop

Docker lets us run a PostgreSQL database inside an isolated container — no manual database installation needed!

**Step 1:** Go to [Docker Desktop](https://www.docker.com/products/docker-desktop/).

**Step 2:** Click "Download Docker Desktop" and choose your OS.

**Step 3:** Run the installer. Follow all prompts and restart your computer if asked.

**Step 4:** After installation, **open the Docker Desktop application**. Wait until the whale icon in the taskbar turns green and says "Engine Running". This is critical — Docker must be running before you proceed to Phase 3.

**Step 5:** Verify:
```bash
docker -v
docker compose version
```
✅ **Expected output:**
```
Docker version 26.x.x
Docker Compose version v2.x.x
```

---

### 1.5 Install Git

Git is used to download (clone) the project from GitHub.

**Step 1:** Go to [git-scm.com](https://git-scm.com/downloads).

**Step 2:** Download and install the version for your OS. Leave all settings on defaults.

**Step 3:** Verify:
```bash
git --version
```
✅ **Expected output:** `git version 2.x.x`

---

## Phase 2 — Clone the Repository

This downloads the full project source code to your computer.

**Step 1:** Choose a folder where you want to keep the project. For example, `C:\Projects` on Windows or `~/Projects` on Mac.

**Step 2:** Open your terminal in that folder and run:
```bash
git clone https://github.com/mritunjai-prog/Xebia-Enterprise-LMS.git
cd Xebia-Enterprise-LMS
```

You now have the entire project on your computer.

---

## Phase 3 — Start the Backend (Database + Microservices)

The backend Spring Boot services (Course Service and API Gateway) need a PostgreSQL database and Redis to function. We have dockerized the entire backend infrastructure, so you can start everything with just **one command**.

**Make sure Docker Desktop is open and running (green icon)!**

Open your terminal and run:

```bash
cd backend
docker compose up --build -d
```

> The `--build` flag ensures the Java applications are compiled and packaged into Docker containers.
> The `-d` flag means "detached" — it runs in the background. Your terminal will be free to use again.

Wait about 60–90 seconds for the containers to fully start up, then verify they are running:
```bash
docker ps
```
✅ **Expected output:** You should see rows for `course-service`, `api-gateway`, `postgres`, and `redis` all showing `STATUS: Up`.

> **What is happening?** Docker is reading the `docker-compose.yml` file and automatically:
> 1. Building the `common-lib` shared library.
> 2. Compiling and starting the **API Gateway** (Port `8080`).
> 3. Compiling and starting the **Course Service** (Port `8084`).
> 4. Starting the PostgreSQL database and running all Flyway SQL migrations.
> 5. Starting the Redis cache.

You do NOT need to run any Maven commands manually. The backend is now fully running!

---

## Phase 4 — Configure Environment Variables

The frontend needs several API keys to enable image uploading and AI features.

**Step 1:** In the root of the project (the `Xebia-Enterprise-LMS` folder), create a new file named exactly `.env`. Note the leading dot — this is important!

> On Windows, if File Explorer won't let you name a file starting with a dot, open VS Code and do File → New File → name it `.env`.

**Step 2:** Open the `.env` file and paste the following:

```env
# Backend API Gateway (running locally)
VITE_API_BASE_URL=http://localhost:8080

# Cloudinary (Image Uploads) — already configured for this project
VITE_CLOUDINARY_CLOUD_NAME=izyaykle
VITE_CLOUDINARY_UPLOAD_PRESET=lms_uploads

# Groq AI (for AI course/category generation)
# Get your free API key from: https://console.groq.com
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### How to get a free Groq API key:
1. Go to [console.groq.com](https://console.groq.com) and sign up.
2. In the left sidebar, click **API Keys**.
3. Click **Create API Key**, give it a name, and copy the key.
4. Replace `your_groq_api_key_here` in your `.env` file with your actual key.

> ⚠️ **Never commit your `.env` file to GitHub.** It is already listed in `.gitignore` for your protection.

---

## Phase 5 — Run the Frontend

Open **Terminal Window 3** (in the root project folder — `Xebia-Enterprise-LMS`, NOT inside `backend/`):

**Step 1:** Install all JavaScript dependencies (only need to do this once):
```bash
npm install
```
This downloads hundreds of packages from npm. It may take 1–2 minutes.

**Step 2:** Start the development server:
```bash
npm run dev
```

✅ **Expected output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Phase 6 — Access the Platform

Open your web browser and visit:

| Portal | URL |
|---|---|
| 🛡️ Admin Portal | http://localhost:5173/ |
| 🎓 Student Portal | http://localhost:5173/student |
| 📊 Analytics | http://localhost:5173/admin/analytics |

---

## Understanding the Application

### Admin Portal Overview

The admin portal is accessible at `/` and is designed for platform administrators and course architects. It features a collapsible sidebar with dark mode support and the following modules:

**Dashboard:**
The landing page showing real-time KPIs, course and category statistics, and platform-wide engagement metrics at a glance.

**Courses (`/courses`):**
- View all courses in a data-rich list with search and filter.
- Create new courses with AI-assistance (click the ✨ button to auto-generate descriptions, learning outcomes, and prerequisites from just a course title).
- Build a full 4-level curriculum hierarchy: **Course → Modules → Submodules → Content Blocks**.
- Add rich text and video content blocks to each submodule using the Content Manager.

**Categories (`/categories`):**
- Manage the category taxonomy for the platform.
- Create categories with images (uploaded to Cloudinary) and AI-generated descriptions.
- View which courses belong to each category.

**Analytics (`/analytics/executive` and sub-pages):**
A 7-page analytics suite. Navigate the sub-pages from the expandable "Analytics" section in the sidebar.

---

### Student Portal Overview

The student portal at `/student` is an entirely separate experience from the admin side, with its own dedicated dark-purple sidebar, navbar, and page layouts.

**Student Dashboard (`/student`):**
- A personalized welcome banner.
- Quick action cards (Resume Last Course, Browse Catalogue).
- Stat tiles (enrolled courses, hours learned, completed, certifications).
- Two interactive charts: Learning Activity (bar chart) and Subject Performance (radar chart).

**Course Catalogue (`/student/courses`):**
Browse and search all available courses. Each course card shows progress, level, and category.

**Course Playback (`/student/course/:id`):**
Full course learning view with:
- A right-side curriculum sidebar showing all modules and submodules.
- Content area rendering video or text for the selected submodule.
- Progress tracking as submodules are completed.

**Assessments, Results, Feedback, Notifications:**
Complete post-course activities and manage your learning journey.

---

### Analytics Suite Overview

| Page | URL | Description |
|---|---|---|
| Executive | `/admin/analytics/executive` | High-level KPIs and engagement trends |
| Coverage | `/admin/analytics/coverage` | Content coverage across departments |
| Hours | `/admin/analytics/hours` | Learning hours by team and role |
| AI Transformation | `/admin/analytics/ai-transformation` | AI content adoption metrics |
| Flagship Programs | `/admin/analytics/flagship-programs` | Key programme performance |
| Certifications | `/admin/analytics/certifications` | Certification trends |
| Pillars | `/admin/analytics/pillars` | Content by learning pillar |

---

## Deployment Guide (Render + Vercel)

The production version of this application is deployed on free-tier cloud services:

### Frontend → Vercel
1. Push code to the `main` branch on GitHub.
2. Vercel automatically detects the push and builds the project.
3. Add **Environment Variables** in Vercel → Settings → Environment Variables:
   - `VITE_API_BASE_URL` = `https://xebia-api-gateway-mritunjai.onrender.com`
   - `VITE_CLOUDINARY_CLOUD_NAME` = `izyaykle`
   - `VITE_CLOUDINARY_UPLOAD_PRESET` = `lms_uploads`
   - `VITE_GROQ_API_KEY` = your key

### Backend → Render Web Services
1. Both `api-gateway` and `course-service` are deployed as separate Web Services on Render.
2. Each service uses the Dockerfile in its respective folder.
3. In the API Gateway's Environment Variables on Render, set:
   - `SERVICES_COURSE` = `https://xebia-course-service-mritunjai.onrender.com`
4. Set the PostgreSQL connection in the Course Service's Environment Variables:
   - `SPRING_DATASOURCE_URL` = your Render PostgreSQL connection string
   - `SPRING_DATASOURCE_USERNAME` = your db username
   - `SPRING_DATASOURCE_PASSWORD` = your db password

> ⚠️ **Free tier warning:** Render free services go to sleep after 15 minutes of inactivity. The first request after sleep will take 30–60 seconds to wake up. This is normal!

---

## Troubleshooting Guide

### Problem 1: `java is not recognized as an internal or external command`
**Cause:** Java is not in your system PATH.  
**Fix:** Follow the PATH instructions in Step 1.1 carefully. Make sure to close and reopen your terminal after editing environment variables.

---

### Problem 2: `mvn is not recognized`
**Cause:** Maven's `bin` folder is not in your PATH.  
**Fix:** Repeat the PATH steps in Step 1.2. Make sure you are pointing to the `bin` sub-folder (not just the maven root folder).

---

### Problem 3: `Connection refused` on startup / `HikariPool - Exception during pool initialization`
**Cause:** The Course Service cannot connect to PostgreSQL.  
**Fix:**
1. Make sure Docker Desktop is open and the green "Engine Running" status is shown.
2. Run `docker ps` — ensure the postgres container is listed with `STATUS: Up`.
3. If the container is not running: `cd backend && docker compose up -d`.
4. Restart the Course Service.

---

### Problem 4: `Web server failed to start. Port 8084 was already in use.`
**Cause:** Something else is already using port 8084 (maybe a previous run that didn't shut down).  
**Fix (Windows):**
```bash
# Find what's using port 8084
netstat -ano | findstr :8084
# Look at the last number (the Process ID, e.g., 12345)
# Kill that process
taskkill /PID 12345 /F
```
**Fix (Mac/Linux):**
```bash
lsof -ti:8084 | xargs kill -9
```
Then try starting the service again.

---

### Problem 5: `Flyway: Validate failed - Migration checksum mismatch for migration V10`
**Cause:** A migration SQL file was changed after it already ran successfully in the database.  
**Fix:** This can be safely resolved locally by wiping the database and starting fresh:
```bash
cd backend
docker compose down -v    # The -v flag deletes database volumes
docker compose up -d      # Start fresh PostgreSQL
```
Then restart the Course Service. It will re-run all migrations from scratch.

> ⚠️ This will delete ALL data in your local database, but on a fresh development setup that's usually fine.

---

### Problem 6: AI features not working / `Groq API key is not configured`
**Cause:** The `.env` file is missing, misnamed, or in the wrong location.  
**Fix:**
1. Make sure the `.env` file is in the ROOT of the project (same folder as `package.json`).
2. Not in `/src`, not in `/backend` — the **root folder**.
3. Make sure the file is named exactly `.env` — not `.env.txt` or `env.txt`.
4. After creating or editing `.env`, you MUST restart the Vite server: press `Ctrl+C` to stop it, then run `npm run dev` again.

---

### Problem 7: `npm install` fails with permission errors (Mac/Linux)
**Cause:** Permission issue on the node_modules directory.  
**Fix:**
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

---

### Problem 8: The page loads but shows "An error occurred while fetching data"
**Cause:** The frontend can't reach the API Gateway.  
**Fix:**
1. Make sure Terminal Window 2 (API Gateway) is still running and shows `Started ApiGatewayApplication`.
2. Make sure Terminal Window 1 (Course Service) is still running and shows `Started CourseServiceApplication`.
3. Make sure your `.env` has `VITE_API_BASE_URL=http://localhost:8080`.

---

*If you have followed every step in this guide and still have trouble, please open an issue on the GitHub repository with the full error message, and the team will help you!* 🚀
