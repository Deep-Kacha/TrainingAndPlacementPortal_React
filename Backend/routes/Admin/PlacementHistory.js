const express = require('express');
const router = express.Router();
const { getPlacementHistory, getPlacementSummary, addPlacement, getSelectedStudentsByJob } = require('../../controllers/Admin/PlacementHistory');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET  /api/admin/placements          - List individual student placement records
router.get('/placements', verifyToken, requireRole('admin'), getPlacementHistory);

// GET  /api/admin/placements/summary  - Job-level grouped summary for table view
router.get('/placements/summary', verifyToken, requireRole('admin'), getPlacementSummary);

// POST /api/admin/placements          - Manually add a placement record
router.post('/placements', verifyToken, requireRole('admin'), addPlacement);

module.exports = router;
