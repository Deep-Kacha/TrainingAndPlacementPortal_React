const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function seed() {
    try {
        // ── Admin Credential ─────────────────────────────────────────────────
        const adminHash = await bcrypt.hash('Admin@123', 10);
        await pool.query(`
            INSERT INTO users (name, email, password_hash, role, is_approved) 
            VALUES ('Admin', 'admin@rku.ac.in', $1, 'admin', true) 
            ON CONFLICT (email) DO UPDATE SET password_hash = $1, is_approved = true
        `, [adminHash]);
        console.log('✅ Admin user seeded: admin@rku.ac.in / Admin@123');

        // ── Student Credential ────────────────────────────────────────────────
        const studentHash = await bcrypt.hash('Student@123', 10);
        const result = await pool.query(`
            INSERT INTO users (name, email, password_hash, role, is_approved)
            VALUES ('Test Student', 'student@rku.ac.in', $1, 'student', true)
            ON CONFLICT (email) DO UPDATE SET password_hash = $1, is_approved = true
            RETURNING id
        `, [studentHash]);

        const userId = result.rows[0].id;

        // Create student profile if it doesn't exist
        await pool.query(`
            INSERT INTO students_profile (
                user_id, enrollment_no, department, semester, cgpa, contact_number,
                personal_email, tenth_percentage, twelfth_percentage, backlogs,
                parent_name, parent_email, parent_mobile,
                current_address, permanent_address, city, state, pincode
            ) VALUES (
                $1, 'RKU2024001', 'Computer Science', 6, 8.50, '9876543210',
                'student@gmail.com', 90.00, 85.00, 0,
                'Parent Name', 'parent@gmail.com', '9876543211',
                '123 College Road', '123 College Road', 'Rajkot', 'Gujarat', '360001'
            )
            ON CONFLICT (user_id) DO NOTHING
        `, [userId]);
        console.log('✅ Student user seeded: student@rku.ac.in / Student@123');

        console.log('\n🎉 All credentials seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
}

seed();
