// Entry point for backend
// Sets up express, connects to MongoDB and registers routes.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Basic health endpoint
app.get('/', (req, res) => res.send('Taskaty API running'));

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server after DB connect
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected to Taskaty DB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
