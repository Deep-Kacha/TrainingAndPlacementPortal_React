const express = require('express');
const router = express.Router();
const { getInterviewSchedules, createInterviewSchedule, deleteInterviewSchedule } = require('../../controllers/Admin/InterviewSchedule');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET  /api/admin/interviews          - Fetch all approved jobs with their schedule rounds
router.get('/interviews', verifyToken, requireRole('admin'), getInterviewSchedules);

// POST /api/admin/interviews           - Create a new schedule round for a job
router.post('/interviews', verifyToken, requireRole('admin'), createInterviewSchedule);

// DELETE /api/admin/interviews/:scheduleId - Delete a specific schedule round
router.delete('/interviews/:scheduleId', verifyToken, requireRole('admin'), deleteInterviewSchedule);

module.exports = router;
