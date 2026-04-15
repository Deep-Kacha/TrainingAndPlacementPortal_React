const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

const { getStudentProfile, updateStudentProfile } = require('../../controllers/Student/Profile');
const { getStudentDashboardStats } = require('../../controllers/Student/Dashboard');
const { getJobsForStudent, applyToJob } = require('../../controllers/Student/Jobs');
const { getAppliedJobs } = require('../../controllers/Student/Applications');
const { getStudentInterviews } = require('../../controllers/Student/Interview_schedule');
const { getStudentPlacementHistory } = require('../../controllers/Student/Placement_history');

// All student routes require 'student' role
router.use(verifyToken, requireRole('student'));

// Dashboard
router.get('/dashboard-stats', getStudentDashboardStats);

// Profile
router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);

// Jobs
router.get('/jobs', getJobsForStudent);
router.post('/apply/:jobId', applyToJob);

// Applications
router.get('/applications', getAppliedJobs);

// Interviews
router.get('/interviews', getStudentInterviews);

// Placement History
router.get('/placements', getStudentPlacementHistory);

module.exports = router;
