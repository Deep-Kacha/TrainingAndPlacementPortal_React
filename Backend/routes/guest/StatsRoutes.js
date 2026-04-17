const express = require('express');
const router = express.Router();
const { getPublicStats, getPlacementOfficers } = require('../../controllers/guest/Stats');

// GET /api/guest/stats - Public Landing Page Statistics
router.get('/stats', getPublicStats);
router.get('/contact-officers', getPlacementOfficers);

module.exports = router;
