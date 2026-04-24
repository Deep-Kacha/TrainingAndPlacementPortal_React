const express = require('express');
const router = express.Router();
const { getInterviewSchedules, createInterviewSchedule, deleteInterviewSchedule, updateInterviewSchedule } = require('../../controllers/Admin/InterviewSchedule');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET  /api/admin/interviews          - Fetch all approved jobs with their schedule rounds
router.get('/interviews', verifyToken, requireRole('admin'), getInterviewSchedules);

// POST /api/admin/interviews           - Create a new schedule round for a job
router.post('/interviews', verifyToken, requireRole('admin'), createInterviewSchedule);

// PUT  /api/admin/interviews/:scheduleId - Update an existing schedule round
router.put('/interviews/:scheduleId', verifyToken, requireRole('admin'), updateInterviewSchedule);

// DELETE /api/admin/interviews/:scheduleId - Delete a specific schedule round
router.delete('/interviews/:scheduleId', verifyToken, requireRole('admin'), deleteInterviewSchedule);

module.exports = router;
