const pool = require('../config/db');

/**
 * Automatically closes job postings whose application deadlines have passed.
 * Intended to run once per day or upon server startup.
 */
const autoCloseJobs = async () => {
    try {
        console.log("🕒 Running Job Expiry Cleanup...");
        const result = await pool.query(`
            UPDATE jobs
            SET status = 'closed'
            WHERE application_deadline < CURRENT_DATE
              AND status = 'approved'
            RETURNING id, job_title
        `);

        if (result.rowCount > 0) {
            console.log(`✅ Closed ${result.rowCount} expired job(s):`);
            result.rows.forEach(job => console.log(`   - #${job.id}: ${job.job_title}`));
        } else {
            console.log("ℹ️ No expired jobs to close.");
        }
    } catch (error) {
        console.error("❌ Error during job cleanup:", error.message);
    }
};

module.exports = { autoCloseJobs };
