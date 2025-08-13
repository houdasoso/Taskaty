# Taskaty Deployment & Maintenance Guide

## 1️⃣ Render Services Overview

| Service | URL | Service ID | Notes |
|---------|-----|-----------|-------|
| Backend | [https://taskaty-7zlp.onrender.com](https://taskaty-7zlp.onrender.com) | srv-d2ed43s9c44c738rk3j0 | Node.js service, handles API requests, authentication, and database operations. |
| Frontend | [https://taskaty-front.onrender.com](https://taskaty-front.onrender.com) | srv-d2edmkqdbo4c738arqhg | React static site, connects to backend API via `REACT_APP_API_URL`. |

2️⃣ Environment Variables
Backend
Set in Render → Environment:

MongoDB connection string

JWT secret key

Optional: Server port

Frontend
Set in Render → Environment:

API URL pointing to backend: REACT_APP_API_URL=https://taskaty-7zlp.onrender.com/api

⚠️ Keep environment variables secure and do not commit .env files to GitHub.

3️⃣ Deployment Process
Backend:

Install dependencies, start the server, deploy on Render Node.js service.

Frontend:

Install dependencies, build project, deploy built files to Render static site.

Ensure frontend points to backend API correctly.

4️⃣ CORS & Security
Allow requests from the frontend URL on the backend.

Ensure secure communication between frontend and backend.

Protect sensitive data and environment variables.

5️⃣ Future Updates
Make changes locally in the project.

Commit and push changes to GitHub.

Render auto-deploys backend and frontend from the main branch.

If API URL or environment variables change, rebuild the frontend and redeploy.

6️⃣ Maintenance & Monitoring
Audit dependencies regularly for security vulnerabilities.

Monitor backend and frontend logs on Render.

Backup environment variables securely.

Update dependencies and rebuild as needed for stability and security.