const pool = require('../../config/db');

/**
 * GET /api/student/applications
 * Returns all jobs applied to by the logged-in student.
 */
const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        const studentId = profileRes.rows[0].id;

        const query = `
            SELECT 
                a.id as "applicationId", 
                j.id as "id",
                COALESCE(cp.company_name, j.company_name) as "company", 
                j.job_title as "role", 
                j.ctc_package as "salary", 
                j.location, 
                j.drive_date as "driveDate",
                j.application_deadline as "deadline",
                j.description,
                j.required_skills as "requiredSkills",
                j.selection_process as "selectionProcess",
                j.bond,
                j.internship_duration as "internshipDuration",
                j.stipend,
                COALESCE(cp.website, j.website) as "companyWebsite",
                j.eligible_courses as "eligibleCourses",
                j.eligibility_criteria as "eligibilityCriteria",
                j.eligible_batches as "eligibleBatches",
                a.status, 
                a.applied_at as "appliedAt"
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE a.student_id = $1
            ORDER BY a.applied_at DESC
        `;
        const result = await pool.query(query, [studentId]);

        const STATUS_LABELS = {
            applied:     'Pending Review',
            shortlisted: 'Shortlisted',
            interview:   'In Interview',
            selected:    'Selected 🎉',
            rejected:    'Not Selected'
        };

        const formatted = result.rows.map(app => ({
            ...app,
            appliedAt: new Date(app.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            driveDate: app.driveDate ? new Date(app.driveDate).toLocaleDateString('en-IN') : '—',
            deadline: app.deadline ? new Date(app.deadline).toLocaleDateString('en-IN') : '—',
            statusLabel: STATUS_LABELS[app.status] || app.status,
            isApplied: true, // Since it's from applications table
            applicationStatus: app.status
        }));

        // Check if student is placed globally
        const placementRes = await pool.query("SELECT 1 FROM placement_history WHERE student_id = $1 LIMIT 1", [studentId]);
        const isPlaced = placementRes.rowCount > 0;

        res.status(200).json({ success: true, data: formatted, isPlaced });
    } catch (error) {
        console.error("Error fetching student applications:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getAppliedJobs };
