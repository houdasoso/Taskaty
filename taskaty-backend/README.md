# Taskaty
# Backend quick start
1. cd backend
2. cp .env.example .env  (edit .env)
3. npm install
4. npm run dev  // uses nodemon

Endpoints:
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me (protected)
GET  /api/tasks (protected)
POST /api/tasks (protected)
PUT  /api/tasks/:id (protected)
DELETE /api/tasks/:id (protected)
