const pool = require('../../config/db');

/**
 * GET /api/admin/stats
 * Fetches dashboard statistics + placements-by-company analytics.
 */
const getDashboardStats = async (req, res) => {
    try {
        const [
            totalStudents,
            pendingApprovals,
            activeJobs,
            totalApplications,
            shortlisted,
            selected,
            placementsByCompany
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM students_profile"),
            pool.query("SELECT COUNT(*) FROM users WHERE role = 'student' AND is_approved = false"),
            pool.query("SELECT COUNT(*) FROM jobs WHERE status = 'approved'"),
            pool.query("SELECT COUNT(*) FROM applications"),
            pool.query("SELECT COUNT(*) FROM applications WHERE status = 'shortlisted'"),
            pool.query("SELECT COUNT(*) FROM applications WHERE status = 'selected'"),
            pool.query(`
                SELECT 
                    COALESCE(cp.company_name, j.company_name, 'Unknown') as company,
                    COUNT(a.id)::int as total,
                    COUNT(CASE WHEN a.status = 'selected' THEN 1 END)::int as placed
                FROM applications a
                JOIN jobs j ON a.job_id = j.id
                LEFT JOIN companies_profile cp ON j.company_id = cp.id
                GROUP BY COALESCE(cp.company_name, j.company_name, 'Unknown')
                ORDER BY placed DESC, total DESC
                LIMIT 10
            `)
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalStudents:     parseInt(totalStudents.rows[0].count),
                pendingApprovals:  parseInt(pendingApprovals.rows[0].count),
                activeJobs:        parseInt(activeJobs.rows[0].count),
                totalApplications: parseInt(totalApplications.rows[0].count),
                shortlisted:       parseInt(shortlisted.rows[0].count),
                selected:          parseInt(selected.rows[0].count),
                placementsByCompany: placementsByCompany.rows
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getDashboardStats };
