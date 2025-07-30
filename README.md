# Taskaty
Taskaty is a full-featured task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to help users efficiently manage their daily activities by providing a clean and user-friendly interface for organizing tasks, setting deadlines, and tracking progress.

This application supports user authentication and authorization, allowing individuals to create their own personalized task boards. With Taskaty, users can easily create, read, update, and delete (CRUD) tasks, organize their workflow, and stay on top of deadlines.

Whether you're a student managing coursework, a professional juggling multiple projects, or someone who simply wants to keep their day organized, Taskaty provides the structure and tools to help users stay productive.
taskaty – Task Management App (Backend – Phase 1)
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
