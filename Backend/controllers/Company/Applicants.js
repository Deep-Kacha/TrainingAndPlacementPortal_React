const pool = require('../../config/db');

/**
 * GET /api/company/applicants
 * Fetches all applications for jobs posted by this company.
 */
const getCompanyApplicants = async (req, res) => {
    try {
        const userId = req.userId;
        
        const companyRes = await pool.query('SELECT id FROM companies_profile WHERE user_id = $1', [userId]);
        if (companyRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Company profile not found" });
        }
        const companyId = companyRes.rows[0].id;

        const applicantsRes = await pool.query(`
            SELECT 
                a.id as "applicationId",
                j.job_title as "jobTitle",
                u.name as "studentName",
                u.email as "studentEmail",
                sp.enrollment_no as "enrollmentNo",
                sp.cgpa,
                sp.department,
                a.status as "applicationStatus",
                a.applied_at as "appliedAt"
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            JOIN students_profile sp ON a.student_id = sp.id
            JOIN users u ON sp.user_id = u.id
            WHERE j.company_id = $1
            ORDER BY a.applied_at DESC
        `, [companyId]);

        res.status(200).json({ success: true, data: applicantsRes.rows });
    } catch (error) {
        console.error("Error fetching company applicants:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getCompanyApplicants };
