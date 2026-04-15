const express = require('express');
const router  = express.Router();
const {
    getAdminProfile,
    updateAdminProfile,
    addUser,
    getAllAdminUsers,
    deleteAdminUser,
    toggleAdminUser
} = require('../../controllers/Admin/Profile');
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');

// GET  /api/admin/profile
router.get('/profile',              verifyToken, requireRole('admin'), getAdminProfile);

// PUT  /api/admin/profile
router.put('/profile',              verifyToken, requireRole('admin'), updateAdminProfile);

// POST /api/admin/add-user  (super admin only — enforced in controller)
router.post('/add-user',            verifyToken, requireRole('admin'), addUser);

// GET  /api/admin/users
router.get('/users',                verifyToken, requireRole('admin'), getAllAdminUsers);

// DELETE /api/admin/users/:id  (super admin only)
router.delete('/users/:id',         verifyToken, requireRole('admin'), deleteAdminUser);

// PUT /api/admin/users/:id/toggle  (super admin only)
router.put('/users/:id/toggle',     verifyToken, requireRole('admin'), toggleAdminUser);

module.exports = router;
