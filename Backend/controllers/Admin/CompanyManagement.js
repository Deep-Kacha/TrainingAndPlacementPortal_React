const pool = require('../../config/db');
const { broadcast } = require('../../config/socket');

/**
 * GET /api/admin/companies
 * Fetches all jobs (JDs) with their associated company profile data.
 * Updated to support Guest submissions via LEFT JOIN and COALESCE.
 */
const getAllCompanies = async (req, res) => {
    try {
        const query = `
            SELECT 
                j.id, 
                COALESCE(cp.company_name, j.company_name) as "name", 
                j.job_title as "role", 
                j.ctc_package as "salary", 
                j.location, 
                j.selection_process as "process", 
                j.status
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            ORDER BY j.created_at DESC
        `;
        const result = await pool.query(query);
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching companies/jobs:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * PUT /api/admin/companies/:id/status
 * Updates the status of a job posting (pending, approved, rejected).
 */
const updateCompanyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status value" });
        }

        const result = await pool.query(
            "UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Job posting not found" });
        }

        broadcast('REFRESH_JOBS');
        broadcast('REFRESH_STATS');
        res.status(200).json({ success: true, message: `Status updated to ${status}` });
    } catch (error) {
        console.error("Error updating company/job status:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * GET /api/admin/jobs/:id
 * Fetches detailed info about a specific job post for JdDetail viewing/editing.
 */
const getJobDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                j.*, 
                COALESCE(cp.company_name, j.company_name) as "resolved_company_name"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE j.id = $1
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Job details not found" });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Error fetching job details:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * PUT /api/admin/jobs/:id
 * Updates entire JD details.
 */
const updateJobDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            job_position, description, ctc_package, location, website,
            stipend, bond, joining_date, eligible_batches, eligible_courses,
            selection_process, drive_date, registration_link,
            contact_person_name, contact_person_email, contact_person_mobile,
            additional_info
        } = req.body;

        const query = `
            UPDATE jobs SET
                job_position = $1,
                description = $2,
                ctc_package = $3,
                location = $4,
                website = $5,
                stipend = $6,
                bond = $7,
                joining_date = $8,
                eligible_batches = $9,
                eligible_courses = $10,
                selection_process = $11,
                drive_date = $12,
                registration_link = $13,
                contact_person_name = $14,
                contact_person_email = $15,
                contact_person_mobile = $16,
                additional_info = $17
            WHERE id = $18
            RETURNING *;
        `;

        const values = [
            job_position, description, ctc_package, location, website,
            stipend, bond, joining_date, eligible_batches, eligible_courses,
            selection_process, drive_date, registration_link,
            contact_person_name, contact_person_email, contact_person_mobile,
            additional_info, id
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Job details not found" });
        }

        broadcast('REFRESH_JOBS');
        res.status(200).json({ success: true, message: "Job details updated successfully!", data: result.rows[0] });
    } catch (error) {
        console.error("Error updating job details:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getAllCompanies, updateCompanyStatus, getJobDetail, updateJobDetail };
