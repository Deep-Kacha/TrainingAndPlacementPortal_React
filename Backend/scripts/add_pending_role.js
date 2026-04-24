require('dotenv').config();
const pool = require('../config/db');

async function runMigration() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        console.log('Adding "pending" role to user_role enum...');
        // We use a DO block because ADD VALUE cannot run inside a transaction block in some Postgres versions
        // but we can check if it exists first.
        const checkResult = await client.query(`
            SELECT 1 FROM pg_type t 
            JOIN pg_enum e ON t.oid = e.enumtypid 
            WHERE t.typname = 'user_role' AND e.enumlabel = 'pending'
        `);

        if (checkResult.rows.length === 0) {
            // Note: ALTER TYPE ... ADD VALUE cannot be executed within a transaction block
            // unless we are in PG 12+. Let's try without transaction for this specific command.
            await client.query('COMMIT'); 
            await pool.query("ALTER TYPE user_role ADD VALUE 'pending'");
            console.log('✅ Added "pending" role successfully.');
        } else {
            console.log('ℹ️ "pending" role already exists.');
            await client.query('ROLLBACK');
        }
    } catch (err) {
        if (err.message.includes('already exists')) {
            console.log('ℹ️ "pending" role already exists.');
        } else {
            console.error('❌ Migration failed:', err.message);
        }
        try { await client.query('ROLLBACK'); } catch(e) {}
    } finally {
        client.release();
        process.exit(0);
    }
}

runMigration();
