const pool = require('../../config/db');
const { broadcast } = require('../../config/socket');

/**
 * GET /api/student/jobs
 * Returns all approved job postings with the student's personal application status.
 */
const getJobsForStudent = async (req, res) => {
    try {
        const userId = req.userId;

        // 1. Get student profile ID
        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        if (profileRes.rows.length === 0) return res.status(404).json({ success: false, error: "Profile not found" });
        const studentId = profileRes.rows[0].id;

        // 2. Fetch jobs with LEFT JOIN to applications for status
        const query = `
            SELECT 
                j.id, 
                COALESCE(cp.company_name, j.company_name) as "company", 
                j.job_title as "role", 
                j.ctc_package as "salary", 
                j.location, 
                j.application_deadline as "deadline",
                j.drive_date as "driveDate",
                j.description,
                a.status as "applicationStatus"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            LEFT JOIN applications a ON a.job_id = j.id AND a.student_id = $1
            WHERE j.status = 'approved'
            ORDER BY j.drive_date DESC NULLS LAST, j.created_at DESC
        `;
        const result = await pool.query(query, [studentId]);

        const formattedJobs = result.rows.map(job => ({
            ...job,
            deadline: job.deadline ? new Date(job.deadline).toLocaleDateString('en-IN') : '—',
            driveDate: job.driveDate ? new Date(job.driveDate).toLocaleDateString('en-IN') : '—',
            status: job.applicationStatus ? 'Applied' : 'Apply',
            rawStatus: job.applicationStatus
        }));

        res.status(200).json({ success: true, data: formattedJobs });
    } catch (error) {
        console.error("Error fetching jobs for student:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * POST /api/student/apply/:jobId
 * Submits a new application for a job.
 */
const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        const studentId = profileRes.rows[0].id;

        await pool.query(
            "INSERT INTO applications (student_id, job_id, status) VALUES ($1, $2, 'applied') ON CONFLICT DO NOTHING",
            [studentId, jobId]
        );

        broadcast('REFRESH_APPLICATIONS');
        broadcast('REFRESH_STATS');
        res.status(201).json({ success: true, message: "Applied successfully" });
    } catch (error) {
        console.error("Error applying to job:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getJobsForStudent, applyToJob };
