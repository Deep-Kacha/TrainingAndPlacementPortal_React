const express = require('express');
const router = express.Router();
const { getAppliedCompanies, getStudentsByJob, updateApplicationStatus } = require('../../controllers/Admin/ManageApplications');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// Grouped under /api/applications/admin
router.get('/applied-companies', verifyToken, requireRole('admin'), getAppliedCompanies);
router.get('/job/:jobId/students', verifyToken, requireRole('admin'), getStudentsByJob);
router.put('/:applicationId/status', verifyToken, requireRole('admin'), updateApplicationStatus);

module.exports = router;
