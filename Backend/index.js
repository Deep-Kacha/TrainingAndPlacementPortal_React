const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
// Connect to PostgreSQL via config/db.js
require('./config/db');

const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Parses incoming JSON payloads

// Register API Routes
app.use('/api/auth', require('./routes/guest/AuthRoutes'));
app.use('/api/admin', require('./routes/Admin/StudentManagerRoutes'));

// Basic Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('Training & Placement Portal Backend is running!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running smoothly!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
