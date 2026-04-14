const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function seedAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        await pool.query(`
            INSERT INTO users (name, email, password_hash, role, is_approved) 
            VALUES ('Admin', 'admin@rku.ac.in', $1, 'admin', true) 
            ON CONFLICT (email) DO NOTHING
        `, [hashedPassword]);
        console.log('✅ Admin user successfully seeded!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
