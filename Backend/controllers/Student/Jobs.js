const pool = require('../../config/db');
const { broadcast } = require('../../config/socket');

/**
 * GET /api/student/jobs
 * Returns all approved job postings with the student's personal application status.
 */
const getJobsForStudent = async (req, res) => {
    try {
        const userId = req.userId;

        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        if (profileRes.rows.length === 0) return res.status(404).json({ success: false, error: "Profile not found" });
        const studentId = profileRes.rows[0].id;

        // Check if student is already placed
        const placementRes = await pool.query("SELECT COUNT(*) FROM placement_history WHERE student_id = $1", [studentId]);
        const isPlacedGlobally = parseInt(placementRes.rows[0].count) > 0;

        const query = `
            SELECT 
                j.id, 
                COALESCE(cp.company_name, j.company_name)   as "company", 
                j.job_title                                 as "role", 
                j.ctc_package                               as "salary", 
                j.location, 
                j.application_deadline                      as "deadlineRaw",
                j.drive_date                                as "driveDateRaw",
                j.description,
                j.required_skills                           as "requiredSkills",
                j.eligibility_criteria                      as "eligibilityCriteria",
                j.selection_process                         as "selectionProcess",
                j.stipend,
                j.bond,
                j.internship_duration                       as "internshipDuration",
                j.eligible_batches                          as "eligibleBatches",
                j.eligible_courses                          as "eligibleCourses",
                j.min_cgpa                                  as "minCgpa",
                COALESCE(cp.website, j.website)             as "companyWebsite",
                a.status                                    as "applicationStatus",
                a.id                                        as "applicationId"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            LEFT JOIN applications a ON a.job_id = j.id AND a.student_id = $1
            WHERE j.status = 'approved'
            ORDER BY j.drive_date DESC NULLS LAST, j.created_at DESC
        `;
        const result = await pool.query(query, [studentId]);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formattedJobs = result.rows.map(job => {
            const deadline = job.deadlineRaw ? new Date(job.deadlineRaw) : null;
            const deadlinePassed = deadline ? deadline < today : false;
            const daysLeft = deadline
                ? Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
                : null;

            return {
                ...job,
                deadline: deadline ? deadline.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
                driveDate: job.driveDateRaw ? new Date(job.driveDateRaw).toLocaleDateString('en-IN') : '—',
                daysLeft,
                deadlinePassed,
                isApplied: !!job.applicationStatus,
                applicationStatus: job.applicationStatus || null
            };
        });

        res.status(200).json({ 
            success: true, 
            data: formattedJobs,
            isPlaced: isPlacedGlobally 
        });
    } catch (error) {
        console.error("Error fetching jobs for student:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * POST /api/student/apply/:jobId
 * Submits a new application — validates deadline and placement policy.
 */
const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.userId;

        // 1. Get student profile
        const profileRes = await pool.query("SELECT id FROM students_profile WHERE user_id = $1", [userId]);
        if (profileRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Student profile not found." });
        }
        const studentId = profileRes.rows[0].id;

        // 2. PLACEMENT POLICY CHECK
        const placementRes = await pool.query("SELECT COUNT(*) FROM placement_history WHERE student_id = $1", [studentId]);
        if (parseInt(placementRes.rows[0].count) > 0) {
            return res.status(403).json({ 
                success: false, 
                error: "You have already been selected for a position. Per our placement policy, you are no longer eligible for further job drives." 
            });
        }

        // 3. Verify job exists and is approved
        const jobRes = await pool.query(
            "SELECT id, application_deadline, status FROM jobs WHERE id = $1",
            [jobId]
        );
        if (jobRes.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Job not found." });
        }
        const job = jobRes.rows[0];

        if (job.status !== 'approved') {
            return res.status(400).json({ success: false, error: "This job is no longer accepting applications." });
        }

        // 4. Deadline check
        if (job.application_deadline) {
            const deadline = new Date(job.application_deadline);
            deadline.setHours(23, 59, 59, 999); // allow full deadline day
            if (new Date() > deadline) {
                return res.status(400).json({
                    success: false,
                    error: `Application deadline has passed (${deadline.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}).`
                });
            }
        }

        // 5. Check for duplicate
        const dupCheck = await pool.query(
            "SELECT id FROM applications WHERE student_id = $1 AND job_id = $2",
            [studentId, jobId]
        );
        if (dupCheck.rows.length > 0) {
            return res.status(409).json({ success: false, error: "You have already applied for this position." });
        }

        // 6. Insert application
        await pool.query(
            "INSERT INTO applications (student_id, job_id, status) VALUES ($1, $2, 'applied')",
            [studentId, jobId]
        );

        broadcast('REFRESH_APPLICATIONS');
        broadcast('REFRESH_STATS');
        res.status(201).json({ success: true, message: "Application submitted successfully!" });
    } catch (error) {
        console.error("Error applying to job:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getJobsForStudent, applyToJob };
