<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/mritunjai-prog/mritunjai-prog/main/assets/readme-header.png" alt="" width="200" onerror="this.src='https://img.icons8.com/clouds/200/000000/learning.png'">
  <br>
  Xebia Enterprise LMS
  <br>
</h1>

<h4 align="center">A Next-Generation Learning Management System engineered for enterprise-grade training, built with a modern React + Vite stack and Spring Boot microservices.</h4>

<p align="center">
  <a href="#key-features">Features</a> •
  <a href="#core-architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#meet-the-team">Meet the Team</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-00D8FF?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=700&color=4F46E5&center=true&vCenter=true&width=900&lines=Building+Next-Gen+Learning+Experiences;Advanced+Course+%26+Module+Hierarchy;Real-time+Analytics+%26+Dashboards;Highly+Optimized+React+19+Frontend" alt="Typing SVG" />
</p>

---

## 🌟 About the Project

**Xebia Enterprise LMS** is a state-of-the-art educational platform designed to streamline complex corporate training and large-scale academic learning. It goes beyond simple course delivery by offering a deep structural hierarchy: **Courses ➔ Modules ➔ Submodules ➔ Content Blocks**. 

Built with performance and user experience in mind, the platform boasts a highly interactive, drag-and-drop hierarchy builder, comprehensive SEO metadata capabilities, and a visually stunning UI crafted with Tailwind CSS and Framer Motion.

---

## 🔥 Key Features

- 🏗️ **Advanced Curriculum Builder:** Fully animated, drag-and-drop interface for structuring complex courses. Automatically handles order indexing, slug generation, and real-time validation.
- ⚡ **Real-Time Analytics Dashboard:** Monitor KPIs, track batch progress, evaluate student performance, and view system-wide engagement metrics instantly.
- 🎨 **Premium Glassmorphism UI:** Stunning aesthetics with smooth transitions, seamless dark/light mode toggles, micro-animations, and responsive layouts that look beautiful on any device.
- 🔍 **SEO & Open Graph Engineered:** Deep metadata configuration at the submodule level to ensure content is fully optimized for search engines and social sharing.
- 🔒 **Enterprise-Grade Security:** Ready for integration with robust authentication flows, role-based access control (RBAC), and secure microservice endpoints.
- 💾 **Offline-First Resilience:** Implements intelligent `localStorage` sync strategies for seamless development and data persistence during network drops.

---

## 🏗️ Core Architecture

<table>
  <tr>
    <td align="center" width="50%">
      <h3>💻 Frontend Engine</h3>
      <p>Blazing fast UI powered by cutting-edge web technologies.</p>
    </td>
    <td align="center" width="50%">
      <h3>⚙️ Backend Microservices</h3>
      <p>Scalable, robust, and secure server-side infrastructure.</p>
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li><b>Framework:</b> React 19 + Vite</li>
        <li><b>Routing:</b> Tanstack Router for type-safe routing</li>
        <li><b>Styling:</b> Tailwind CSS + Custom Design Tokens</li>
        <li><b>State Management:</b> Zustand for global state</li>
        <li><b>Animations:</b> Framer Motion</li>
        <li><b>Icons:</b> Lucide React</li>
      </ul>
    </td>
    <td>
      <ul>
        <li><b>Core:</b> Java 17+ & Spring Boot 3</li>
        <li><b>Architecture:</b> Microservices Pattern</li>
        <li><b>Database:</b> JPA / Hibernate (SQL)</li>
        <li><b>API Gateway:</b> Spring Cloud Gateway</li>
        <li><b>Discovery:</b> Eureka Service Registry</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- Java Development Kit (JDK) 17+ (for backend services)

### Installation

Because this repository operates as a **Monorepo** containing both the React Frontend and the Spring Boot Backend microservices, you must boot the backend infrastructure before the UI.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mritunjai-prog/Xebia-Enterprise-LMS.git
   cd Xebia-Enterprise-LMS
   ```

2. **Boot the Backend (Java + Docker):**
   *Ensure Docker Desktop is running and Maven is installed on your system.*
   ```bash
   cd backend
   
   # Compile all 13 Java microservices into .jar files
   mvn clean package -DskipTests
   
   # Boot the databases and microservices simultaneously
   docker compose up --build -d
   ```
   *Wait ~2 minutes for all 16 containers to reach a `Healthy` state.*

3. **Start the Frontend (React/Vite):**
   Open a new terminal window at the root of the project (`Xebia-Enterprise-LMS`):
   ```bash
   npm install
   npm run dev
   ```

4. **Access the Portal:**
   - **Frontend UI**: `http://localhost:3000/`
   - **Backend API Gateway**: `http://localhost:8080/api`
   - **Database Access**: Connect to `localhost:5432` (User: `lms`, Pass: `lms`)

---

## 👥 Meet the Development Team

This platform is proudly engineered and maintained by an exceptional team of developers:

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/mritunjai-prog">
        <img src="https://github.com/mritunjai-prog.png" width="80px;" alt="Mritunjai Singh"/><br />
        <b>Mritunjai Singh</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Abhijeet0Tiwari">
        <img src="https://github.com/Abhijeet0Tiwari.png" width="80px;" alt="Abhijeet Tiwari"/><br />
        <b>Abhijeet Tiwari</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ManishKumawat450">
        <img src="https://github.com/ManishKumawat450.png" width="80px;" alt="Manish Kumawat"/><br />
        <b>Manish Kumawat</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Vijay-Menaria">
        <img src="https://github.com/github.png" width="80px;" alt="Vijay Menaria"/><br />
        <b>Vijay Menaria</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Vinit1120">
        <img src="https://github.com/github.png" width="80px;" alt="Vinit Menaria"/><br />
        <b>Vinit Menaria</b>
      </a>
    </td>
  </tr>
</table>

---

<div align="center">
  <i>If you found this project helpful, please consider leaving a ⭐ on the repository!</i>
  <br><br>
  <p>Built with ❤️ by the Xebia LMS Team</p>
</div>
