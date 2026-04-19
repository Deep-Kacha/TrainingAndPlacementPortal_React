const pool = require('../../config/db');

/**
 * GET /api/student/placements
 * Returns placement history (confirmed offers) for the student.
 */
const getStudentPlacementHistory = async (req, res) => {
    try {
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        const studentId = profileRes.rows[0].id;

        const query = `
            SELECT 
                COALESCE(cp.company_name, j.company_name) as "company", 
                j.job_title as "role", 
                j.ctc_package as "salary", 
                a.applied_at as "date", 
                a.status,
                ph.offer_letter_url as "offerLetterUrl"
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            LEFT JOIN placement_history ph ON (a.student_id = ph.student_id AND a.job_id = ph.job_id)
            WHERE a.student_id = $1
            ORDER BY a.applied_at DESC
        `;
        const result = await pool.query(query, [studentId]);

        const formatted = result.rows.map(row => ({
            ...row,
            date: row.date ? new Date(row.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
        }));

        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        console.error("Error fetching student placement history:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getStudentPlacementHistory };
