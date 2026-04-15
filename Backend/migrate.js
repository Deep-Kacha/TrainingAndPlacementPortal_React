require('dotenv').config();
const pool = require('./config/db');

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Add updated_at to applications if not exists
        await client.query(`
            ALTER TABLE applications 
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        `);
        console.log('✅ applications.updated_at added (or already exists)');

        // Create trigger function
        await client.query(`
            CREATE OR REPLACE FUNCTION update_applications_modtime()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ language 'plpgsql'
        `);
        console.log('✅ Trigger function created');

        // Drop existing trigger if any and recreate
        await client.query(`
            DROP TRIGGER IF EXISTS trg_update_applications_modtime ON applications
        `);
        await client.query(`
            CREATE TRIGGER trg_update_applications_modtime
            BEFORE UPDATE ON applications
            FOR EACH ROW EXECUTE PROCEDURE update_applications_modtime()
        `);
        console.log('✅ Trigger created on applications table');

        await client.query('COMMIT');
        console.log('\n🎉 Migration completed successfully!\n');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', err.message);
    } finally {
        client.release();
        process.exit(0);
    }
}

migrate();
