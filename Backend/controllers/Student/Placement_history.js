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
                company_name as "company", 
                job_title as "role", 
                ctc_offered as "salary", 
                placement_date as "date", 
                offer_letter_url as "offerLetterUrl"
            FROM placement_history
            WHERE student_id = $1
            ORDER BY placement_date DESC
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
