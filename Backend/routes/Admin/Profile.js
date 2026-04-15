const express = require('express');
const router = express.Router();
const { getAdminProfile, updateAdminProfile, addUser, getAllAdminUsers } = require('../../controllers/Admin/Profile');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET /api/admin/profile - Protected
router.get('/profile', verifyToken, requireRole('admin'), getAdminProfile);

// PUT /api/admin/profile - Protected
router.put('/profile', verifyToken, requireRole('admin'), updateAdminProfile);

// POST /api/admin/add-user - Protected
router.post('/add-user', verifyToken, requireRole('admin'), addUser);

// GET /api/admin/users - Protected
router.get('/users', verifyToken, requireRole('admin'), getAllAdminUsers);

module.exports = router;
