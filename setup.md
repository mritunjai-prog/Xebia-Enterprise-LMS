# 🚀 Ultimate Setup Guide: Xebia Enterprise LMS

Welcome to the Xebia Enterprise LMS! This guide is designed to be **completely foolproof**. Even if you have never written a line of Java, never used React, or never installed a database, this guide will hold your hand through every single step to get the entire project running perfectly on your computer.

---

## 📑 Table of Contents
1. [Phase 1: Installing Core Prerequisites](#phase-1-installing-core-prerequisites)
2. [Phase 2: Setting up the Database (Docker)](#phase-2-setting-up-the-database-docker)
3. [Phase 3: Booting the Backend (Java & Spring Boot)](#phase-3-booting-the-backend-java--spring-boot)
4. [Phase 4: Booting the Frontend (React & Vite)](#phase-4-booting-the-frontend-react--vite)
5. [Phase 5: Configuring AI & Environment Variables](#phase-5-configuring-ai--environment-variables)
6. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🛠️ Phase 1: Installing Core Prerequisites

Before we touch any code, your computer needs specific software to understand Java and JavaScript.

### 1. Install Java 21 (JDK)
The backend of this project is written in **Java**, specifically version 21.
1. Go to the [Oracle Java 21 Downloads Page](https://www.oracle.com/java/technologies/downloads/#java21).
2. Download the installer for your operating system (Windows x64 Installer, macOS ARM64 DMG, etc.).
3. Run the installer and click "Next" until it finishes.
4. **Verify:** Open your terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and type:
   ```bash
   java -version
   ```
   *You should see `java version "21.x.x"` print out. If you see an error, you need to add Java to your System PATH.*

### 2. Install Maven
Maven is the tool that downloads Java libraries and builds our code.
1. Go to the [Maven Download Page](https://maven.apache.org/download.cgi).
2. Download the `Binary zip archive` (e.g., `apache-maven-3.9.6-bin.zip`).
3. Extract the ZIP file to a permanent location, like `C:\Program Files\apache-maven`.
4. **Add to PATH (Windows):**
   - Open Start Menu, search "Environment Variables".
   - Under "System variables", find `Path` and click Edit.
   - Click New, and paste the path to Maven's `bin` folder (e.g., `C:\Program Files\apache-maven\bin`).
   - Click OK on everything.
5. **Verify:** Open a **new** terminal and type:
   ```bash
   mvn -version
   ```
   *You should see Maven version details.*

### 3. Install Node.js
Node.js runs our frontend React environment.
1. Go to [Nodejs.org](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version.
3. Run the installer and leave all settings on Default.
4. **Verify:**
   ```bash
   node -v
   npm -v
   ```

### 4. Install Docker Desktop
Docker runs our PostgreSQL database without you needing to install PostgreSQL manually.
1. Go to [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Download and install it.
3. Once installed, **open Docker Desktop** and wait for the engine to start (the icon turns green). You MUST have Docker Desktop open and running in the background for Phase 2 to work.

---

## 🗄️ Phase 2: Setting up the Database (Docker)

Our project uses PostgreSQL for the database. Instead of installing PostgreSQL, we use Docker to spin up an isolated container.

1. Open a terminal and navigate to the root of the project:
   ```bash
   cd path/to/Xebia-Enterprise-LMS
   ```
2. Navigate into the `backend` folder where the Docker configuration lives:
   ```bash
   cd backend
   ```
3. Tell Docker to download PostgreSQL and start it in the background (`-d`):
   ```bash
   docker-compose up -d
   ```
   *(Note: This might take a few minutes the very first time as it downloads the database image).*
4. **Verify:** Run `docker ps`. You should see a container named `postgres` running on port `5432`.

---

## ⚙️ Phase 3: Booting the Backend (Java & Spring Boot)

Our backend uses a microservices architecture. It has:
- **common-lib**: A shared library used by other services.
- **course-service**: The core service that handles course data and connects to PostgreSQL.
- **api-gateway**: The front door that routes requests to the correct service.

### Step 1: Install the Common Library
Because `course-service` relies on `common-lib`, we must build it first.
```bash
cd backend/common-lib
mvn clean install
```
*(You should see a green "BUILD SUCCESS" message at the end).*

### Step 2: Run the Course Service
Now we start the service that connects to our database.
```bash
cd ../course-service
mvn spring-boot:run
```
*(Wait until the logs stop moving and you see a message saying "Started CourseServiceApplication". Do NOT close this terminal. It must stay open!)*

### Step 3: Run the API Gateway
The frontend doesn't talk to the Course Service directly; it talks to the API Gateway.
Open a **NEW terminal window**, navigate to the project, and run:
```bash
cd backend/api-gateway
mvn spring-boot:run
```
*(Wait until you see "Started ApiGatewayApplication").*

---

## 💻 Phase 4: Booting the Frontend (React & Vite)

Now that the databases and APIs are running, let's start the user interface!

1. Open a **NEW terminal window** (you should now have 3 terminal windows open).
2. Navigate to the root folder of the project:
   ```bash
   cd path/to/Xebia-Enterprise-LMS
   ```
3. Install all the JavaScript dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your web browser and go to: `http://localhost:5173` (or whichever port Vite tells you in the terminal).

You should now see the beautiful LMS interface!

---

## 🤖 Phase 5: Configuring AI & Environment Variables

To use the AI curriculum generation and image uploading features, you need API keys.

1. In the root of the project (where `package.json` is), create a new file exactly named `.env`.
2. Open `.env` in your code editor and paste the following:

```env
# Cloudinary (For Image Uploads)
VITE_CLOUDINARY_CLOUD_NAME=izyaykle
VITE_CLOUDINARY_UPLOAD_PRESET=lms_uploads

# Groq (For AI Generation)
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### How to get a Groq API Key:
1. Go to [Groq Cloud](https://console.groq.com/).
2. Create an account and go to API Keys.
3. Click "Create API Key", copy it, and replace `your_groq_api_key_here` in your `.env` file.
4. **Restart your frontend server** (Click `Ctrl + C` in the frontend terminal, then run `npm run dev` again) to load the new keys!

---

## 🚑 Troubleshooting Guide

Here are the most common issues you might face and exactly how to fix them:

### 1. "Web server failed to start. Port 8084 was already in use."
**The Problem:** You tried to start a microservice, but something else on your computer is already using its port.
**The Fix (Windows):**
1. Open Command Prompt as Administrator.
2. Find what is using the port: `netstat -ano | findstr :8084`
3. Look at the last number on the right (the PID).
4. Kill it: `taskkill /PID <the_pid> /F`
5. Try starting the service again.

### 2. "Connection refused" or "HikariPool - Exception during pool initialization"
**The Problem:** The Java backend cannot talk to the PostgreSQL database.
**The Fix:**
1. Make sure you actually completed **Phase 2**.
2. Open Docker Desktop and ensure the database container is running.
3. If it failed, run `docker-compose down` followed by `docker-compose up -d`.

### 3. "Groq API key is not configured"
**The Problem:** The AI features are trying to fire, but they don't have access.
**The Fix:** 
1. Make sure your `.env` file is in the ROOT of the project, not inside `src` or `backend`.
2. Make sure you named it exactly `.env`, not `.env.txt`.
3. You MUST restart the Vite frontend (`npm run dev`) after creating or editing the `.env` file!

### 4. Flyway Checksum Mismatch Error
**The Problem:** You changed a database migration SQL file after it already ran successfully.
**The Fix:** 
1. The easiest way to fix this locally is to wipe your local database clean and let it rebuild.
2. Run `docker-compose down -v` (The `-v` deletes the database volumes!).
3. Run `docker-compose up -d`.
4. Restart the Course Service. It will run all migrations from scratch cleanly.

---
*If you followed every step in this document, you are now officially running the Xebia Enterprise LMS locally! Happy Coding!* 🚀
