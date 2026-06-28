# Xebia Enterprise LMS — Setup Guide

Welcome! This guide will walk you through setting up and running the **Xebia Enterprise LMS** on your local machine. We provide instructions for both the frontend and the backend.

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Download |
|------|---------|----------|
| **Git** | Any | https://git-scm.com |
| **Node.js** | 20+ | https://nodejs.org |
| **Java JDK** | 21+ | https://adoptium.net |
| **Docker Desktop** | Latest | https://www.docker.com/products/docker-desktop *(Recommended for Database and Services)* |
| **Maven** | 3.9+ | https://maven.apache.org/download.cgi *(Only if building Java services manually)* |

> **Windows users:** If using Docker, ensure Docker Desktop is running before you begin.

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Xebia LMS"
```

---

## 2. Frontend Setup

The frontend is a React + TanStack Start application.

### Step 1 — Create the environment file

From the **root** of the repository:

```bash
copy .env.example .env        # Windows
# OR
cp .env.example .env           # macOS / Linux
```

Open `.env` and add your `VITE_GROQ_API_KEY` for AI features:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Start the development server

```bash
npm run dev
```

The frontend will start at **http://localhost:3000**

> Make sure the backend is running before using the app, otherwise API calls will fail.

---

## 3. Backend Setup

The backend is a suite of Java Spring Boot microservices. You have two ways to run the backend: **Using Docker (Recommended)** or **Manual Setup (Without Docker)**.

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

---

### Option A: Running Backend with Docker (Recommended)

This is the easiest method. It runs all databases, message brokers, and Java microservices automatically.

From inside the `backend/` directory, run:

```bash
docker compose up --build -d
```

> ⏳ **First build takes 5–10 minutes** as Maven downloads dependencies.

**Stopping the backend:**
```bash
docker compose down          # Stop containers (keeps data)
docker compose down -v       # Stop & wipe all data (fresh start)
```

---

### Option B: Running Backend Without Docker

If you prefer not to use Docker for the Java services, you can run them manually. **However, you still need the supporting infrastructure (Database, Redis, Kafka, MinIO).**

#### Step 1: Start ONLY the Database & Infrastructure using Docker

If you have Docker but just want to run Java natively:
```bash
# In backend directory
docker compose up -d postgres redis kafka minio zookeeper
```

*Alternatively, if you want NO DOCKER AT ALL, you must manually install and run PostgreSQL (Port 5432), Redis (Port 6379), Kafka (Port 9092), and MinIO (Port 9000/9001) on your local machine.*

#### Step 2: Build the Java Services

From the `backend/` directory, build the services using Maven:
```bash
# Windows
.\mvnw.cmd clean package -DskipTests
# macOS / Linux
./mvnw clean package -DskipTests
```

#### Step 3: Run the Services

You must run the services locally in your terminal or IDE. We recommend using an IDE like IntelliJ IDEA.
Run the main classes in the following order:

1. `api-gateway`: Start `com.xebia.lms.gateway.ApiGatewayApplication`
2. `course-service`: Start `com.xebia.lms.course.CourseServiceApplication`
3. Start any other microservices you need (e.g., `user-management`, `organisation-service`, etc).

> The API Gateway must run on port **8080**, and course-service on **8084**.

---

## 4. Verify the Setup

Once all backend services and frontend are up, test the API gateway:

```bash
curl http://localhost:8080/actuator/health
# You should see {"status":"UP"}
```

Open the frontend:
**http://localhost:3000**

### Default Admin Credentials

```
Email:    admin@lms.com
Password: (whatever you set in ADMIN_PASSWORD, default: AdminChangeMe123!)
```

---

## 5. Useful URLs

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

## 6. Common Issues & Fixes

### ❌ `JWT_SECRET` error on startup
- Your secret must be **at least 32 characters long**.

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

*Made with ❤️ by the Xebia LMS Team*
