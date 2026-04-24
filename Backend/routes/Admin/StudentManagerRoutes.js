const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../../middleware/authMiddleware');
const { getAllStudents, approveStudent, rejectStudent, deleteStudent, getStudentApplicationHistory } = require('../../controllers/Admin/StudentManagerController');

// All routes below require Admin privileges
router.use(verifyToken, requireRole('admin'));

router.get('/students', getAllStudents);
router.put('/students/:id/approve', approveStudent);
router.put('/students/:id/reject', rejectStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
