const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

const { getCompanyStats } = require('../../controllers/Company/Dashboard');
const { getCompanyJobs } = require('../../controllers/Company/Jobs');
const { getCompanyApplicants } = require('../../controllers/Company/Applicants');

// All company routes require token and 'company' role
router.use(verifyToken, requireRole('company'));

// Dashboard Stats
router.get('/dashboard/stats', getCompanyStats);

// Jobs
router.get('/jobs', getCompanyJobs);

// Applicants
router.get('/applicants', getCompanyApplicants);

module.exports = router;
