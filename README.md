# Taskaty
askaty – Task Management App (Backend – Phase 1)
A backend server built with Node.js, Express.js, and MongoDB for managing tasks. This is Phase 1, which focuses on setting up the server, connecting to MongoDB, and creating basic CRUD functionality for tasks.

 Features
RESTful API for task management
MongoDB integration using Mongoose
Environment variables for secure configuration
Proper folder structure (MVC Pattern)
CORS enabled for frontend integration
Tested with Postman
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB Atlas, Mongoose
Tools: Nodemon, dotenv, Postman
config/db.js 
Handles MongoDB database connection using mongoose.
models/Task.js    
Defines the Mongoose Schema for your tasks.
controllers/taskController.js 
Contains business logic for handling task-related operations:
getTasks – Fetch all tasks
createTask – Add a new task
updateTask – Update a task by ID
deleteTask – Delete a task by ID
Each function receives (req, res) and interacts with the database.
routes/taskRoutes.js 
Defines Express routes for tasks.
