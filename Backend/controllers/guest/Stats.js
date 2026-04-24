const pool = require('../../config/db');

/**
 * GET /api/guest/stats
 * Fetches public statistics for the home page.
 */
const getPublicStats = async (req, res) => {
    try {
        const [
            totalStudents,
            placedStudents,
            totalCompanies,
            highestPackage
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM students_profile"),
            pool.query("SELECT COUNT(DISTINCT student_id) FROM placement_history"),
            pool.query("SELECT COUNT(*) FROM companies_profile"),
            pool.query("SELECT MAX(ctc_offered) FROM placement_history") // Note: Simplified for now
        ]);

        const studentsCount = parseInt(totalStudents.rows[0].count) || 0;
        const placedCount = parseInt(placedStudents.rows[0].count) || 0;
        const placementRate = studentsCount > 0 ? Math.round((placedCount / studentsCount) * 100) : 0;

        res.status(200).json({
            success: true,
            data: [
                { value: `${studentsCount}+`, label: "Registered Students" },
                { value: `${placementRate}%`, label: "Placement Rate" },
                { value: `${totalCompanies.rows[0].count}+`, label: "Recruiters" },
                { value: `${highestPackage.rows[0].max || "12 LPA"}`, label: "Highest Package" }
            ]
        });
    } catch (error) {
        console.error("Error fetching public stats:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const getPlacementOfficers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT u.name, u.email, a.mobile, a.department FROM users u LEFT JOIN admins_profile a ON u.id = a.user_id WHERE u.role = 'admin' AND u.is_approved = true LIMIT 2"
        );
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching placement officers:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getPublicStats, getPlacementOfficers };
