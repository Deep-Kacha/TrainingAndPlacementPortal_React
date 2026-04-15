const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function fix() {
  try {
    const hash = await bcrypt.hash('Admin@123', 10);
    await pool.query("UPDATE users SET password_hash = $1 WHERE email = 'admin@rku.ac.in'", [hash]);
    console.log('✅ Admin password fixed!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fix();
