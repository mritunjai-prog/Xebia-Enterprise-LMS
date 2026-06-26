# Xebia Enterprise LMS — Setup Guide

Welcome! This guide will walk you through setting up and running the **Xebia Enterprise LMS** on your local machine — both the backend microservices and the frontend.

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Download |
|------|---------|----------|
| **Git** | Any | https://git-scm.com |
| **Node.js** | 20+ | https://nodejs.org |
| **Docker Desktop** | Latest | https://www.docker.com/products/docker-desktop |
| **Java JDK** | 21+ | https://adoptium.net *(only if running services without Docker)* |

> **Windows users:** Make sure Docker Desktop is running before you begin.

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Xebia LMS"
```

---

## 2. Backend Setup

The backend is a suite of Java Spring Boot microservices orchestrated via Docker Compose.

### Step 1 — Create the environment file

Navigate to the `backend/` directory and copy the example env file:

```bash
cd backend
copy .env.example .env        # Windows
# OR
cp .env.example .env           # macOS / Linux
```

Open `backend/.env` and update the values:

```env
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
ADMIN_PASSWORD=YourSecurePassword123!
```

> **Important:** `JWT_SECRET` must be **at least 32 characters** or the services will fail to start.

### Step 2 — Build & Start all backend services

From inside the `backend/` directory, run:

```bash
docker compose up --build
```

This will automatically start:

| Service | Port | Description |
|---------|------|-------------|
| **PostgreSQL** | 5432 | Main database |
| **Redis** | 6379 | Caching & sessions |
| **Kafka** | 9092 | Event messaging |
| **MinIO** | 9000 / 9001 | Object storage (file uploads) |
| **API Gateway** | **8080** | Single entry point for all API calls |
| **IAM Service** | 8081 | Authentication & JWT |
| **Organisation Service** | 8082 | Organizations, universities, colleges |
| **User Management** | 8083 | Users & roles |
| **Course Service** | 8084 | Courses, modules, categories |
| **Batch & Enrolment** | 8085 | Batch & enrollment management |
| **Approval Service** | 8086 | Approval workflows |
| **Notification Service** | 8087 | Email & push notifications |
| **Assessment Service** | 8088 | Quizzes & assessments |
| **Media Streaming** | 8089 | Video streaming |
| **Engagement Service** | 8090 | Discussions & engagement |
| **Document Service** | 8091 | Document management |
| **Audit & Reporting** | 8092 | Audit logs & reports |

> ⏳ **First build takes 5–10 minutes** as Maven downloads all dependencies. Subsequent starts are fast.

### Step 3 — Verify backend is running

Once all containers are up, test the API gateway:

```bash
curl http://localhost:8080/actuator/health
# or open in browser:
# http://localhost:8080/actuator/health
```

You should see `{"status":"UP"}`.

### Default Admin Credentials

```
Email:    admin@lms.com
Password: (whatever you set in ADMIN_PASSWORD, default: AdminChangeMe123!)
```

### Stopping the backend

```bash
docker compose down          # Stop containers (keeps data)
docker compose down -v       # Stop & wipe all data (fresh start)
```

---

## 3. Frontend Setup

The frontend is a React + TanStack Start application.

### Step 1 — Install dependencies

From the **root** of the repository (not inside `backend/`):

```bash
npm install
```

### Step 2 — Start the development server

```bash
npm run dev
```

The frontend will start at **http://localhost:3000**

> Make sure the backend is already running before accessing the app, otherwise API calls will fail.

---

## 4. Full Stack Quick Start (TL;DR)

```bash
# 1. Clone
git clone <your-repo-url>
cd "Xebia LMS"

# 2. Setup backend env
cd backend
copy .env.example .env
# Edit .env and set JWT_SECRET and ADMIN_PASSWORD

# 3. Start all backend services
docker compose up --build -d

# 4. Go back to root and start frontend
cd ..
npm install
npm run dev

# 5. Open the app
# http://localhost:3000
```

---

## 5. Architecture Overview

```
Browser (localhost:3000)
        │
        ▼
  Frontend (React / TanStack)
        │
        ▼ HTTP (localhost:8080)
   API Gateway (Spring Cloud Gateway)
        │
        ├──► IAM Service (Auth / JWT)
        ├──► Course Service (Courses / Categories)
        ├──► User Management
        ├──► Organisation Service
        ├──► Batch & Enrolment
        ├──► Assessment Service
        └──► ... (other microservices)
        
Infrastructure:
  PostgreSQL   — Persistent database (all services share one DB, separate schemas)
  Redis        — Session caching, rate limiting
  Kafka        — Async event bus (notifications, audit events)
  MinIO        — Object storage (file & image uploads)
```

---

## 6. Useful URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Frontend App |
| http://localhost:3000/admin | Admin Dashboard |
| http://localhost:8080 | API Gateway |
| http://localhost:9001 | MinIO Console (file storage) |
| http://localhost:5432 | PostgreSQL (use a GUI like DBeaver) |

### MinIO Console Credentials
```
Username: minio
Password: minio12345
```

---

## 7. Common Issues & Fixes

### ❌ Docker not starting services
- Make sure **Docker Desktop** is open and running.
- Try: `docker compose down -v` then `docker compose up --build`

### ❌ `JWT_SECRET` error on startup
- Your secret must be **at least 32 characters long**.
- Example: `my-super-long-secret-key-that-is-32-chars!!`

### ❌ Frontend shows "Failed to fetch" or API errors
- Make sure the backend is fully started first.
- Check `http://localhost:8080/actuator/health` — it must return `UP`.

### ❌ Port already in use
- Check if something is already running on port 8080, 3000, 5432, etc.
- Kill it or change the port in `docker-compose.yml` / `vite.config.js`.

### ❌ npm install fails
- Make sure you are using **Node.js v20+**: `node --version`
- Delete `node_modules/` and retry: `rm -rf node_modules && npm install`

---

## 8. Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TanStack Router, TanStack Start, Framer Motion, Recharts |
| **API Gateway** | Spring Cloud Gateway |
| **Backend Services** | Java 21, Spring Boot 3, Spring Data JPA |
| **Database** | PostgreSQL 16 |
| **Cache** | Redis 7 |
| **Messaging** | Apache Kafka 3 |
| **Object Storage** | MinIO |
| **Containerization** | Docker Compose |

---

*Made with ❤️ by the Xebia LMS Team*
