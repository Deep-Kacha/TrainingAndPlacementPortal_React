const pool = require('../../config/db');
const { broadcast } = require('../../config/socket');

/**
 * GET /api/applications/admin/applied-companies
 * Fetches all jobs that have at least one applicant.
 */
const getAppliedCompanies = async (req, res) => {
    try {
        const query = `
            SELECT 
                j.id as "jobPostingId", 
                COALESCE(cp.company_name, j.company_name, 'Unknown Company') as "companyName", 
                j.job_title as "jobRole",
                (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) as "applicationCount"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) > 0
            ORDER BY j.created_at DESC
        `;
        const result = await pool.query(query);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching applied companies:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * GET /api/applications/admin/job/:jobId/students
 * Fetches all students who applied to a specific job.
 */
const getStudentsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const query = `
            SELECT 
                a.id as "applicationId", 
                u.name as "studentName", 
                sp.enrollment_no as "enrollmentNumber", 
                sp.department as "branch", 
                sp.semester, 
                sp.cgpa, 
                a.status as "applicationStatus", 
                a.applied_at as "appliedAt"
            FROM applications a
            JOIN students_profile sp ON a.student_id = sp.id
            JOIN users u ON sp.user_id = u.id
            WHERE a.job_id = $1
            ORDER BY sp.cgpa DESC
        `;
        const result = await pool.query(query, [jobId]);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching students by job:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * PUT /api/applications/admin/:applicationId/status
 * Updates the status of a specific student's application.
 */
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        const normalizedStatus = status.toLowerCase();

        await pool.query('BEGIN');

        const result = await pool.query(
            "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
            [normalizedStatus, applicationId]
        );

        const app = result.rows[0];

        // If status is 'selected', sync to placement_history
        if (normalizedStatus === 'selected') {
            // Check if already in history to avoid duplicates
            const checkHistory = await pool.query("SELECT * FROM placement_history WHERE student_id = $1 AND job_id = $2", [app.student_id, app.job_id]);
            
            if (checkHistory.rows.length === 0) {
                // Fetch job and company info for history record
                const jobInfo = await pool.query(`
                    SELECT j.job_title, j.ctc_package, COALESCE(cp.company_name, j.company_name) as "companyName"
                    FROM jobs j
                    LEFT JOIN companies_profile cp ON j.company_id = cp.id
                    WHERE j.id = $1
                `, [app.job_id]);

                if (jobInfo.rows.length > 0) {
                    const { companyName, job_title, ctc_package } = jobInfo.rows[0];
                    await pool.query(`
                        INSERT INTO placement_history (student_id, job_id, company_name, job_title, ctc_offered, placement_date)
                        VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
                    `, [app.student_id, app.job_id, companyName, job_title, ctc_package]);
                }
            }
        }

        await pool.query('COMMIT');
        broadcast('REFRESH_APPLICATIONS');
        broadcast('REFRESH_STATS');
        res.status(200).json({ success: true, message: `Status updated to ${normalizedStatus} and synced to history if selected.` });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Error updating application status:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getAppliedCompanies, getStudentsByJob, updateApplicationStatus };
