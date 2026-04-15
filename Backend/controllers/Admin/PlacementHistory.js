const pool = require('../../config/db');

/**
 * GET /api/admin/placements
 * Fetches placement history from the placement_history table + summary counters.
 * Also supports guest JDs via LEFT JOIN.
 */
const getPlacementHistory = async (req, res) => {
    try {
        // Fetch from dedicated placement_history table
        const query = `
            SELECT 
                ph.id,
                ph.company_name    as "company",
                ph.job_title       as "role",
                ph.ctc_offered     as "package",
                ph.offer_letter_url as "offerLetterUrl",
                ph.placement_date  as "placementDate",
                ph.created_at      as "createdAt",
                u.name             as "studentName",
                sp.enrollment_no   as "enrollmentNo",
                sp.department      as "department"
            FROM placement_history ph
            JOIN students_profile sp ON ph.student_id = sp.id
            JOIN users u ON sp.user_id = u.id
            ORDER BY ph.placement_date DESC NULLS LAST, ph.created_at DESC
        `;
        const result = await pool.query(query);

        const data = result.rows.map(row => ({
            ...row,
            placementDate: row.placementDate
                ? new Date(row.placementDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—',
            createdAt: new Date(row.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        }));

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching placement history:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * GET /api/admin/placements/summary
 * Returns grouped job-level summary (used for the table view).
 */
const getPlacementSummary = async (req, res) => {
    try {
        const query = `
            SELECT 
                j.id,
                COALESCE(cp.company_name, j.company_name) as "company",
                j.job_title                               as "role",
                j.ctc_package                             as "package",
                j.status,
                j.drive_date                              as "driveDate",
                j.joining_date                            as "joiningDate",
                (
                    SELECT COUNT(*)
                    FROM applications a
                    WHERE a.job_id = j.id AND a.status = 'selected'
                )::int                                    as "placedCount"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE j.status IN ('approved', 'closed')
            ORDER BY j.drive_date DESC NULLS LAST
        `;
        const result = await pool.query(query);

        const data = result.rows.map(row => ({
            ...row,
            statusLabel: row.status === 'closed' ? 'Completed' : 'In Progress',
            driveDate: row.driveDate
                ? new Date(row.driveDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—',
            joiningDate: row.joiningDate
                ? new Date(row.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—'
        }));

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching placement summary:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};


/**
 * POST /api/admin/placements
 * Admin manually adds a placement record for a student.
 */
const addPlacement = async (req, res) => {
    try {
        const { student_id, job_id, company_name, job_title, ctc_offered, offer_letter_url, placement_date } = req.body;

        if (!student_id || !company_name || !job_title) {
            return res.status(400).json({ success: false, error: "student_id, company_name and job_title are required." });
        }

        const result = await pool.query(`
            INSERT INTO placement_history (student_id, job_id, company_name, job_title, ctc_offered, offer_letter_url, placement_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [student_id, job_id || null, company_name, job_title, ctc_offered || null, offer_letter_url || null, placement_date || null]);

        res.status(201).json({ success: true, message: "Placement record added.", data: result.rows[0] });
    } catch (error) {
        console.error("Error adding placement:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getPlacementHistory, getPlacementSummary, addPlacement };
