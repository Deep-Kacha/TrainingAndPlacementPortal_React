const pool = require('./db');

const addIndexes = async () => {
    const client = await pool.connect();
    try {
        console.log("🚀 Starting database indexing...");

        await client.query('BEGIN');

        // users: unique email lookup is already indexed if it's a primary key/unique, 
        // but let's ensure an index for faster lookups during auth.
        await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');

        // students_profile: foreign key to user_id is used in almost every student request.
        await client.query('CREATE INDEX IF NOT EXISTS idx_students_profile_userid ON students_profile(user_id)');

        // jobs: status is used for many filtered listings.
        await client.query('CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status)');

        // applications: massive join operations use these often.
        await client.query('CREATE INDEX IF NOT EXISTS idx_applications_jobid ON applications(job_id)');
        await client.query('CREATE INDEX IF NOT EXISTS idx_applications_studentid ON applications(student_id)');

        // interview_schedules: linked to job_id.
        await client.query('CREATE INDEX IF NOT EXISTS idx_interview_jobid ON interview_schedules(job_id)');

        // placement_history: linked to student_id.
        await client.query('CREATE INDEX IF NOT EXISTS idx_placement_history_studentid ON placement_history(student_id)');

        await client.query('COMMIT');
        console.log("✅ Database indexing complete!");
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("❌ Indexing failed:", e.message);
    } finally {
        client.release();
        process.exit();
    }
};

addIndexes();
