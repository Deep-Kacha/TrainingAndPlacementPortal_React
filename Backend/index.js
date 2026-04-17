const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const { autoCloseJobs } = require('./services/jobsCleanup');
dotenv.config();
// Connect to PostgreSQL via config/db.js
require('./config/db');

const app = express();
app.use(morgan('dev')); // Logs all requests to console

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json()); // Parses incoming JSON payloads

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API Routes
app.use('/api/auth', require('./routes/guest/AuthRoutes'));
app.use('/api/guest', require('./routes/guest/SubmitJd'));
app.use('/api/guest', require('./routes/guest/StatsRoutes'));

// Administrative Routes
app.use('/api/admin', require('./routes/Admin/Dashboard'));
app.use('/api/admin', require('./routes/Admin/Profile'));
app.use('/api/admin', require('./routes/Admin/CompanyManagement'));
app.use('/api/admin', require('./routes/Admin/StudentManagerRoutes'));
app.use('/api/admin', require('./routes/Admin/InterviewSchedule'));
app.use('/api/admin', require('./routes/Admin/PlacementHistory'));
app.use('/api/admin', require('./routes/Admin/ChangePassword'));

// Application Management Routes
app.use('/api/applications/admin', require('./routes/Admin/ManageApplications'));

// Student Portal Routes
app.use('/api/student', require('./routes/Student/StudentRoutes'));

// Company Portal Routes
app.use('/api/company', require('./routes/Company/CompanyRoutes'));



// Basic Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('Training & Placement Portal Backend is running!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running smoothly!' });
});

// Start the server
const http = require('http');
const socketConfig = require('./config/socket');
const server = http.createServer(app);
const io = socketConfig.init(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} with real-time support.`);
  
  // Run initial cleanup on startup
  await autoCloseJobs();
  
  // Schedule cleanup every 24 hours
  setInterval(autoCloseJobs, 24 * 60 * 60 * 1000);
});
