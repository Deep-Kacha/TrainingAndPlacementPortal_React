const pool = require('../../config/db');

/**
 * GET /api/admin/stats
 * Fetches dashboard statistics for the Admin portal.
 */
const getDashboardStats = async (req, res) => {
    try {
        // Run all counts in parallel for performance
        const [
            totalStudents,
            pendingApprovals,
            activeJobs,
            totalApplications,
            shortlisted,
            selected
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM students_profile"),
            pool.query("SELECT COUNT(*) FROM users WHERE role = 'student' AND is_approved = false"),
            pool.query("SELECT COUNT(*) FROM jobs WHERE status = 'approved' AND application_deadline >= CURRENT_DATE"),
            pool.query("SELECT COUNT(*) FROM applications"),
            pool.query("SELECT COUNT(*) FROM applications WHERE status = 'shortlisted'"),
            pool.query("SELECT COUNT(*) FROM applications WHERE status = 'selected'")
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalStudents: parseInt(totalStudents.rows[0].count),
                pendingApprovals: parseInt(pendingApprovals.rows[0].count),
                activeJobs: parseInt(activeJobs.rows[0].count),
                totalApplications: parseInt(totalApplications.rows[0].count),
                shortlisted: parseInt(shortlisted.rows[0].count),
                selected: parseInt(selected.rows[0].count)
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getDashboardStats };
