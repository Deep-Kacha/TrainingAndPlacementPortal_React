const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');
const { getAllStudents, toggleStudentApproval } = require('../../controllers/Admin/StudentManagerController');

// All routes below require Admin privileges
router.use(verifyToken, requireRole('admin'));

router.get('/students', getAllStudents);
router.put('/students/:id/approve', toggleStudentApproval);

module.exports = router;
