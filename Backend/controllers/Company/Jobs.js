const pool = require('../../config/db');

/**
 * GET /api/company/jobs
 * Fetches jobs posted by the logged-in company.
 */
const getCompanyJobs = async (req, res) => {
    try {
        const userId = req.userId;
        
        const companyRes = await pool.query('SELECT id FROM companies_profile WHERE user_id = $1', [userId]);
        if (companyRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Company profile not found" });
        }
        const companyId = companyRes.rows[0].id;

        const jobsRes = await pool.query('SELECT * FROM jobs WHERE company_id = $1 ORDER BY created_at DESC', [companyId]);
        res.status(200).json({ success: true, data: jobsRes.rows });
    } catch (error) {
        console.error("Error fetching company jobs:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getCompanyJobs };
