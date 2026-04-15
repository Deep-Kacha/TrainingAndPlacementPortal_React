const express = require('express');
const router = express.Router();
const { getAllCompanies, updateCompanyStatus, getJobDetail, updateJobDetail } = require('../../controllers/Admin/CompanyManagement');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET /api/admin/companies - Protected
router.get('/companies', verifyToken, requireRole('admin'), getAllCompanies);

// PUT /api/admin/companies/:id/status - Protected
router.put('/companies/:id/status', verifyToken, requireRole('admin'), updateCompanyStatus);

// GET /api/admin/jobs/:id - Protected
router.get('/jobs/:id', verifyToken, requireRole('admin'), getJobDetail);

// PUT /api/admin/jobs/:id - Protected
router.put('/jobs/:id', verifyToken, requireRole('admin'), updateJobDetail);

module.exports = router;
