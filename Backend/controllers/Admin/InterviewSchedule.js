const pool = require('../../config/db');

/**
 * GET /api/admin/interviews
 * Fetches approved jobs with their interview schedules.
 * Uses LEFT JOIN + COALESCE to support guest-submitted JDs (no company_id).
 */
const getInterviewSchedules = async (req, res) => {
    try {
        // First get all approved jobs (with or without linked company profiles)
        const jobsQuery = `
            SELECT 
                j.id,
                COALESCE(cp.company_name, j.company_name) as "name",
                j.job_title                                as "role",
                j.ctc_package                              as "salary",
                j.location,
                j.selection_process                        as "process",
                j.drive_date                               as "driveDate",
                j.status                                   as "jobStatus"
            FROM jobs j
            LEFT JOIN companies_profile cp ON j.company_id = cp.id
            WHERE j.status IN ('approved', 'closed')
            ORDER BY j.drive_date ASC NULLS LAST, j.created_at DESC
        `;
        const jobsResult = await pool.query(jobsQuery);

        // For each job, fetch its interview schedule rounds
        const jobsWithSchedules = await Promise.all(
            jobsResult.rows.map(async (job) => {
                const schedulesResult = await pool.query(`
                    SELECT 
                        id, round_name, interview_date, interview_time, mode, venue_or_link
                    FROM interview_schedules
                    WHERE job_id = $1
                    ORDER BY interview_date ASC
                `, [job.id]);

                return {
                    ...job,
                    status: job.jobStatus === 'approved'
                        ? 'Scheduled Interview (Pending)'
                        : 'Scheduled Interview (Complete)',
                    schedules: schedulesResult.rows
                };
            })
        );

        res.status(200).json({ success: true, data: jobsWithSchedules });
    } catch (error) {
        console.error("Error fetching interview schedules:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * POST /api/admin/interviews
 * Creates a new interview schedule round for a job.
 */
const createInterviewSchedule = async (req, res) => {
    try {
        const { job_id, round_name, interview_date, interview_time, mode, venue_or_link } = req.body;

        if (!job_id || !round_name || !interview_date || !interview_time) {
            return res.status(400).json({ success: false, error: "job_id, round_name, interview_date and interview_time are required." });
        }

        const result = await pool.query(`
            INSERT INTO interview_schedules (job_id, round_name, interview_date, interview_time, mode, venue_or_link)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [job_id, round_name, interview_date, interview_time, mode || null, venue_or_link || null]);

        res.status(201).json({ success: true, message: "Interview schedule created.", data: result.rows[0] });
    } catch (error) {
        console.error("Error creating interview schedule:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * DELETE /api/admin/interviews/:scheduleId
 * Deletes an interview schedule round.
 */
const deleteInterviewSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        await pool.query('DELETE FROM interview_schedules WHERE id = $1', [scheduleId]);
        res.status(200).json({ success: true, message: "Interview schedule deleted." });
    } catch (error) {
        console.error("Error deleting interview schedule:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getInterviewSchedules, createInterviewSchedule, deleteInterviewSchedule };
