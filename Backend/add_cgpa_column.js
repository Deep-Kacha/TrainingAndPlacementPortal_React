const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port:     Number(process.env.DB_PORT) || 5432,
});

async function run() {
    try {
        await pool.query("ALTER TABLE jobs ADD COLUMN IF NOT EXISTS min_cgpa DECIMAL(4,2) DEFAULT 0.00;");
        console.log("SUCCESS: min_cgpa column added to jobs table.");
    } catch (err) {
        console.error("FAILURE:", err.message);
    } finally {
        await pool.end();
    }
}

run();
