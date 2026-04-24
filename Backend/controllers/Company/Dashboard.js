const pool = require('../../config/db');

/**
 * GET /api/company/dashboard/stats
 * Fetches overview metrics for the logged-in company.
 */
const getCompanyStats = async (req, res) => {
    try {
        const userId = req.userId; // user role = company
        
        // 1. Get the company_profile ID
        const companyRes = await pool.query('SELECT id FROM companies_profile WHERE user_id = $1', [userId]);
        if (companyRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Company profile not found" });
        }
        const companyId = companyRes.rows[0].id;

        // 2. Fetch stats
        const jobsRes = await pool.query('SELECT COUNT(*) FROM jobs WHERE company_id = $1', [companyId]);
        const applicantsRes = await pool.query(`
            SELECT COUNT(a.*) 
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            WHERE j.company_id = $1
        `, [companyId]);
        const selectedRes = await pool.query(`
            SELECT COUNT(a.*) 
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            WHERE j.company_id = $1 AND a.status = 'selected'
        `, [companyId]);

        res.status(200).json({
            success: true,
            data: {
                totalJobs: parseInt(jobsRes.rows[0].count, 10),
                totalApplicants: parseInt(applicantsRes.rows[0].count, 10),
                totalHired: parseInt(selectedRes.rows[0].count, 10)
            }
        });
    } catch (error) {
        console.error("Error fetching company stats:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getCompanyStats };
