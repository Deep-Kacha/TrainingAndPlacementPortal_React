const pool = require('../../config/db');

/**
 * GET /api/student/applications
 * Returns all jobs applied to by the logged-in student.
 */
const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        const studentId = profileRes.rows[0].id;

        const query = `
            SELECT 
                a.id as "applicationId", 
                COALESCE(cp.company_name, j.company_name) as "company", 
                j.job_title as "role", 
                j.ctc_package as "salary", 
                j.location, 
                a.status, 
                a.applied_at as "appliedAt"
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE a.student_id = $1
            ORDER BY a.applied_at DESC
        `;
        const result = await pool.query(query, [studentId]);

        const formatted = result.rows.map(app => ({
            ...app,
            appliedAt: new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            statusLabel: app.status.charAt(0).toUpperCase() + app.status.slice(1)
        }));

        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        console.error("Error fetching student applications:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getAppliedJobs };
