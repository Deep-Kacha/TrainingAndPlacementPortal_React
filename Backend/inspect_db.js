const pool = require('./config/db');

async function checkTriggers() {
  try {
    console.log('Checking triggers on applications table...');
    const res = await pool.query(`
      SELECT tgname 
      FROM pg_trigger 
      WHERE tgrelid = 'applications'::regclass
    `);
    console.log('Triggers:', res.rows.map(r => r.tgname));
    
    console.log('\nChecking columns on applications table...');
    const colRes = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'applications'
    `);
    console.log('Columns:', colRes.rows.map(r => r.column_name));
    
    process.exit(0);
  } catch (err) {
    console.error('Check failed:', err.message);
    process.exit(1);
  }
}

checkTriggers();
