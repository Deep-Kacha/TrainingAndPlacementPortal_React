const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function seedTestData() {
  try {
    console.log('--- Starting Seeding Process (Indian Context) ---');

    // 1. Clear Existing Data (except the main admin)
    console.log('Clearing old data and restarting sequences...');
    await pool.query('TRUNCATE placement_history, interview_participants, interview_schedules, applications, jobs, companies_profile, students_profile, users RESTART IDENTITY CASCADE');
    // 2. Insert Admin User (TPO)
    console.log('Inserting Admin User...');
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    await pool.query(`
      INSERT INTO users (name, email, password_hash, role, is_approved)
      VALUES ($1, $2, $3, 'admin', true)
      ON CONFLICT (email) DO UPDATE SET password_hash = $3, role = 'admin', is_approved = true
    `, ['TPO Admin', 'admin@rku.ac.in', adminPasswordHash]);

    // 3. Insert Companies
    console.log('Inserting Companies...');
    const companyRes = await pool.query(`
      INSERT INTO companies_profile (company_name, industry, website, hr_contact_name, hr_contact_phone, location)
      VALUES 
        ('Tata Consultancy Services', 'IT Services', 'https://www.tcs.com', 'Rajesh Iyer', '9876543210', 'Mumbai, India'),
        ('Infosys Technologies', 'IT Consulting', 'https://www.infosys.com', 'Sudha Murthy', '9876543211', 'Bangalore, India'),
        ('Wipro Technologies', 'IT & Business Process', 'https://www.wipro.com', 'Azim Premji', '9876543212', 'Bangalore, India'),
        ('Reliance Jio', 'Telecommunications', 'https://www.jio.com', 'Akash Ambani', '9876543213', 'Navi Mumbai, India'),
        ('HCL Technologies', 'Software Services', 'https://www.hcltech.com', 'Roshni Nadar', '9876543214', 'Noida, India')
      RETURNING id, company_name
    `);
    const companies = companyRes.rows;

    // 3. Insert Students
    console.log('Inserting Students...');
    const studentNames = [
      'Test Student', 'Aarav Patel', 'Diya Sharma', 'Siddharth Mehta', 'Ishani Iyer', 'Vivaan Reddy',
      'Ananya Gupta', 'Kabir Malhotra', 'Zoya Khan', 'Arjun Singh', 'Saanvi Joshi'
    ];
    const passwordHash = await bcrypt.hash('Student@123', 10);
    const students = [];

    for (let i = 0; i < studentNames.length; i++) {
        const name = studentNames[i];
        let email = `${name.toLowerCase().replace(' ', '.')}@rku.ac.in`;
        if (name === 'Test Student') email = 'student@rku.ac.in';
      const isApproved = i < 7; // 7 approved, 3 pending

      const userRes = await pool.query(`
        INSERT INTO users (name, email, password_hash, role, is_approved)
        VALUES ($1, $2, $3, 'student', $4) RETURNING id
      `, [name, email, passwordHash, isApproved]);
      
      const userId = userRes.rows[0].id;
      const enrollment = `RKU2026${(100 + i)}`;
      const dept = i % 2 === 0 ? 'B.Tech CSE' : 'B.Tech IT';
      const city = i % 3 === 0 ? 'Rajkot' : (i % 3 === 1 ? 'Ahmedabad' : 'Surat');

      const profileRes = await pool.query(`
        INSERT INTO students_profile (
          user_id, enrollment_no, department, current_year, semester, cgpa, contact_number,
          personal_email, tenth_percentage, twelfth_percentage, backlogs, parent_name,
          city, state, pincode
        ) VALUES ($1, $2, $3, 4, 8, $4, $5, $6, $7, $8, 0, $9, $10, 'Gujarat', '360001')
        RETURNING id
      `, [
        userId, enrollment, dept, 
        (8.5 + (i * 0.1)).toFixed(2), 
        `998877665${i}`, 
        `${name.toLowerCase().replace(' ', '')}@gmail.com`,
        (85 + i).toFixed(2), (80 + i).toFixed(2),
        `Parent of ${name}`,
        city
      ]);

      students.push({ profileId: profileRes.rows[0].id, name });
    }

    // 4. Insert Jobs
    console.log('Inserting Jobs...');
    const jobs = [];
    const jobTitles = ['Software Engineer', 'Graduate Engineer Trainee', 'Data Analyst', 'Web Developer', 'Systems Engineer'];
    const salaries = ['7.5 LPA', '6.0 LPA', '9.0 LPA', '12 LPA', '5.5 LPA'];

    for (let i = 0; i < 10; i++) {
      const comp = companies[i % companies.length];
      const title = jobTitles[i % jobTitles.length];
      const salary = salaries[i % salaries.length];
      const status = i < 6 ? 'approved' : (i < 8 ? 'pending' : 'rejected');
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + 30);

      const jobRes = await pool.query(`
        INSERT INTO jobs (
          company_id, job_title, job_position, job_type, description, status,
          ctc_package, location, application_deadline, eligible_batches, eligible_courses
        ) VALUES ($1, $2, $3, 'Full Time', $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, status
      `, [
        comp.id, title, title,
        `Exciting role at ${comp.company_name} for fresh graduates. Apply now!`,
        status, salary, comp.location, deadline,
        ['2025', '2026'], ['B.Tech CSE', 'B.Tech IT', 'MCA']
      ]);
      jobs.push(jobRes.rows[0]);
    }

    // 5. Insert Applications
    console.log('Inserting Applications...');
    const appStatuses = ['applied', 'shortlisted', 'shortlisted', 'interview', 'interview', 'selected', 'selected', 'rejected'];
    for (let i = 0; i < 30; i++) {
        const student = students[i % students.length];
        const job = jobs[(i + 1) % jobs.length]; // Offset to avoid duplicate pairs
        const status = appStatuses[i % appStatuses.length];

        await pool.query(`
            INSERT INTO applications (student_id, job_id, status)
            VALUES ($1, $2, $3)
            ON CONFLICT (student_id, job_id) DO NOTHING
        `, [student.profileId, job.id, status]);
    }

    // 6. Insert Interview Schedules
    console.log('Inserting Interview Schedules...');
    for (const job of jobs) {
        if (job.status === 'approved') {
            await pool.query(`
                INSERT INTO interview_schedules (job_id, round_name, interview_date, interview_time, mode, venue_or_link)
                VALUES ($1, $2, CURRENT_DATE + 1, '10:00', 'Online', 'Google Meet Link')
            `, [job.id, 'Aptitude Test']);

            await pool.query(`
                INSERT INTO interview_schedules (job_id, round_name, interview_date, interview_time, mode, venue_or_link)
                VALUES ($1, $2, CURRENT_DATE + 3, '14:30', 'Online', 'Zoom Invite')
            `, [job.id, 'Technical Interview']);
        }
    }

    // 7. Insert Placement History
    console.log('Inserting Placement History...');
    const selectedApps = await pool.query("SELECT student_id, job_id FROM applications WHERE status = 'selected'");
    for (const app of selectedApps.rows) {
        const student = students.find(s => s.profileId === app.student_id);
        const jobResult = await pool.query("SELECT j.job_title, j.ctc_package, COALESCE(cp.company_name, j.company_name) as c_name FROM jobs j LEFT JOIN companies_profile cp ON j.company_id = cp.id WHERE j.id = $1", [app.job_id]);
        const job = jobResult.rows[0];

        await pool.query(`
            INSERT INTO placement_history (student_id, job_id, company_name, job_title, ctc_offered, placement_date)
            VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
        `, [student.profileId, app.job_id, job.c_name, job.job_title, job.ctc_package]);
    }

    console.log('--- Seeding Completed Successfully! ---');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
  }
}

seedTestData();
