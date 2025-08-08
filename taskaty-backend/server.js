const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // <--- must be before you use process.env
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('✅ Taskaty backend is working! 🚀');
});
app.listen(PORT, () => console.log(`🚀 Taskaty backend running on port ${PORT}`));
