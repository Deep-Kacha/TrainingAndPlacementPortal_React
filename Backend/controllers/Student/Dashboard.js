const pool = require('../../config/db');

/**
 * GET /api/student/dashboard-stats
 * Returns summary stats for the logged-in student.
 */
const getStudentDashboardStats = async (req, res) => {
    try {
        const userId = req.userId; // From verifyToken middleware

        // 1. Get student profile ID
        const studentRes = await pool.query("SELECT id, name, enrollment_no FROM students_profile sp JOIN users u ON sp.user_id = u.id WHERE u.id = $1", [userId]);
        if (studentRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Student profile not found" });
        }
        const studentId = studentRes.rows[0].id;
        const studentName = studentRes.rows[0].name;
        const enrollment = studentRes.rows[0].enrollment_no;

        // 2. Fetch counts in parallel
        const [
            appliedCount,
            shortlistedCount,
            interviewCount,
            isPlaced
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM applications WHERE student_id = $1", [studentId]),
            pool.query("SELECT COUNT(*) FROM applications WHERE student_id = $1 AND status = 'shortlisted'", [studentId]),
            pool.query("SELECT COUNT(*) FROM applications WHERE student_id = $1 AND status = 'interview'", [studentId]),
            pool.query("SELECT COUNT(*) FROM placement_history WHERE student_id = $1", [studentId])
        ]);

        res.status(200).json({
            success: true,
            data: {
                studentName,
                enrollment,
                counts: {
                    applied: parseInt(appliedCount.rows[0].count),
                    shortlisted: parseInt(shortlistedCount.rows[0].count),
                    interviews: parseInt(interviewCount.rows[0].count),
                    isPlaced: parseInt(isPlaced.rows[0].count) > 0
                }
            }
        });
    } catch (error) {
        console.error("Error fetching student dashboard stats:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getStudentDashboardStats };
