const pool = require('./config/db');

async function repair() {
    try {
        console.log('--- Database Repair Started ---');
        
        // 1. Add missing is_approved column to users
        console.log('Adding "is_approved" column to "users" table...');
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE
        `);
        
        // 2. Set all existing admins to approved (if any)
        console.log('Setting existing admins to approved...');
        await pool.query(`
            UPDATE users SET is_approved = TRUE WHERE role = 'admin'
        `);

        // 3. Add extensive dynamic variables for Registration tracking to students_profile
        console.log('Scaling completely dynamic profile strings directly into "students_profile" table...');
        await pool.query(`
            ALTER TABLE students_profile 
            ADD COLUMN IF NOT EXISTS consent_form_url TEXT,
            ADD COLUMN IF NOT EXISTS payment_proof_url TEXT,
            ADD COLUMN IF NOT EXISTS personal_email VARCHAR(255),
            ADD COLUMN IF NOT EXISTS tenth_percentage DECIMAL(5,2),
            ADD COLUMN IF NOT EXISTS twelfth_percentage DECIMAL(5,2),
            ADD COLUMN IF NOT EXISTS backlogs INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS parent_name VARCHAR(150),
            ADD COLUMN IF NOT EXISTS parent_email VARCHAR(255),
            ADD COLUMN IF NOT EXISTS parent_mobile VARCHAR(20),
            ADD COLUMN IF NOT EXISTS current_address TEXT,
            ADD COLUMN IF NOT EXISTS permanent_address TEXT,
            ADD COLUMN IF NOT EXISTS city VARCHAR(100),
            ADD COLUMN IF NOT EXISTS state VARCHAR(100),
            ADD COLUMN IF NOT EXISTS pincode VARCHAR(20)
        `);

        // 4. Upgrade Jobs table for complete JD tracking
        console.log('Upgrading "jobs" table for comprehensive JD tracking...');
        await pool.query(`
            ALTER TABLE jobs 
            ADD COLUMN IF NOT EXISTS stipend VARCHAR(100),
            ADD COLUMN IF NOT EXISTS bond VARCHAR(200),
            ADD COLUMN IF NOT EXISTS joining_date DATE,
            ADD COLUMN IF NOT EXISTS eligible_batches TEXT[], -- Array of batches
            ADD COLUMN IF NOT EXISTS eligible_courses TEXT[], -- Array of courses
            ADD COLUMN IF NOT EXISTS selection_process TEXT,
            ADD COLUMN IF NOT EXISTS drive_date DATE,
            ADD COLUMN IF NOT EXISTS contact_person_name VARCHAR(150),
            ADD COLUMN IF NOT EXISTS contact_person_email VARCHAR(255),
            ADD COLUMN IF NOT EXISTS contact_person_mobile VARCHAR(20),
            ADD COLUMN IF NOT EXISTS additional_info TEXT,
            ADD COLUMN IF NOT EXISTS website VARCHAR(255),
            ADD COLUMN IF NOT EXISTS job_position VARCHAR(255)
        `);

        // 5. Enhance Applications table with feedback loops
        console.log('Adding feedback columns to "applications" table...');
        await pool.query(`
            ALTER TABLE applications 
            ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
            ADD COLUMN IF NOT EXISTS admin_notes TEXT
        `);

        console.log('✅ Database repair and upgrades completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Repair failed:', error);
        process.exit(1);
    }
}

repair();
