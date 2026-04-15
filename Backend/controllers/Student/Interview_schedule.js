const pool = require('../../config/db');

/**
 * GET /api/student/interviews
 * Returns all upcoming and completed interviews for the student.
 */
const getStudentInterviews = async (req, res) => {
    try {
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        const studentId = profileRes.rows[0].id;

        // Note: Students are currently participation-agnostic in the base schema (rounds are per job).
        // A more advanced schema would use interview_participants, but for the basic dynamic version,
        // we'll show all rounds for jobs the student is 'shortlisted' or later for.
        
        const query = `
            SELECT 
                isched.id, 
                COALESCE(cp.company_name, j.company_name) as "company", 
                j.job_title as "role", 
                isched.round_name as "round", 
                isched.interview_date as "date", 
                isched.interview_time as "time", 
                isched.mode, 
                isched.venue_or_link as "venue",
                a.status as "applicationStatus"
            FROM interview_schedules isched
            JOIN jobs j ON isched.job_id = j.id
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            JOIN applications a ON a.job_id = j.id
            WHERE a.student_id = $1 AND a.status IN ('shortlisted', 'interview', 'selected')
            ORDER BY isched.interview_date DESC, isched.interview_time DESC
        `;
        const result = await pool.query(query, [studentId]);

        const formatted = result.rows.map(row => ({
            ...row,
            date: new Date(row.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            time: row.time.slice(0, 5), // '10:00:00' -> '10:00'
            status: row.applicationStatus === 'selected' ? 'Completed' : 'Pending',
            statusColor: row.applicationStatus === 'selected' ? 'green' : 'red'
        }));

        res.status(200).json({ success: true, data: formatted });
    } catch (error) {
        console.error("Error fetching student interviews:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getStudentInterviews };
