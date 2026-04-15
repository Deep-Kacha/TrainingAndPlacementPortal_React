const pool = require('../../config/db');

/**
 * POST /api/guest/submit-jd
 * Handles JD submissions from guest companies.
 * Reverted: No longer auto-creates company profiles during submission.
 */
const submitJd = async (req, res) => {
    try {
        const {
            email, companyName, jobLocation, website, description,
            jobPosition, ctc, internshipDuration, stipend, bond, joinDate,
            eligibleBatches, eligibleCourses,
            selectionProcess, driveDate, registrationLink,
            contactName, contactEmail, contactMobile, additionalInfo
        } = req.body;

        // Basic validation
        if (!companyName || !email || !jobPosition || !description) {
            return res.status(400).json({ success: false, error: "Please provide all required fields." });
        }

        const query = `
            INSERT INTO jobs (
                company_name, job_title, job_position, description, ctc_package, location, website,
                stipend, bond, joining_date, eligible_batches, eligible_courses,
                selection_process, drive_date, contact_person_name, contact_person_email,
                contact_person_mobile, additional_info, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            RETURNING id;
        `;

        const values = [
            companyName,
            companyName + " - " + jobPosition,
            jobPosition,
            description,
            ctc,
            jobLocation,
            website,
            stipend,
            bond,
            joinDate || null,
            eligibleBatches,
            eligibleCourses,
            selectionProcess,
            driveDate || null,
            contactName,
            contactEmail,
            contactMobile,
            additionalInfo,
            'pending'
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "JD submitted successfully! An administrator will review it and contact you soon.",
            jobId: result.rows[0].id
        });
    } catch (error) {
        console.error("Error submitting JD:", error);
        res.status(500).json({ success: false, error: "Internal server error during JD submission." });
    }
};

module.exports = { submitJd };
