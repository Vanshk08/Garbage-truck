require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const brainRoutes = require('./brain');      // Import routes
const startResetTask = require('./reset');   // Import cron job

const app = express();
app.use(cors());
app.use(express.json());
console.log("🔍 Checking .env variable:", process.env.MONGO_URI); // ADD THIS LINE
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ DB Error:", err));

// Use the routes from brain.js
app.use('/api', brainRoutes);

// Start the daily reset timer
startResetTask();

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));