const express = require('express');
const router = express.Router();
const { changePassword } = require('../../controllers/Admin/ChangePassword');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// PUT /api/admin/change-password - Protected
router.get('/change-password', (req, res) => res.status(405).json({ error: "Method Not Allowed" })); // Safe-guard
router.put('/change-password', verifyToken, requireRole('admin'), changePassword);

module.exports = router;
