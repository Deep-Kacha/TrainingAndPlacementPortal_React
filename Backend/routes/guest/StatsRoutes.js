const express = require('express');
const router = express.Router();
const { getPublicStats } = require('../../controllers/guest/Stats');

// GET /api/guest/stats - Public Landing Page Statistics
router.get('/stats', getPublicStats);

module.exports = router;
