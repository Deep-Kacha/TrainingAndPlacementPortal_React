const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../../controllers/Admin/Dashboard');

// GET /api/admin/stats
router.get('/stats', getDashboardStats);

module.exports = router;
