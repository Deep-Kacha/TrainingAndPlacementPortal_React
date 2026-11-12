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
    console.log('Inserting Companies (Gujarat IT Hubs)...');
    const companyRes = await pool.query(`
      INSERT INTO companies_profile (company_name, industry, website, hr_contact_name, hr_contact_phone, location)
      VALUES 
        ('TatvaSoft', 'Software Development', 'https://www.tatvasoft.com', 'Hardik Shah', '9988776655', 'Ahmedabad, Gujarat'),
        ('Gateway Group', 'IT Solutions', 'https://www.thegatewaycorp.com', 'Nilesh Shah', '9988776656', 'Ahmedabad, Gujarat'),
        ('Silver Touch Technologies', 'IT Consulting', 'https://www.silvertouch.com', 'Vipul Thakkar', '9988776657', 'Gandhinagar, Gujarat'),
        ('Bacancy Technology', 'Agile Software Development', 'https://www.bacancytechnology.com', 'Chandresh Patel', '9988776658', 'Ahmedabad, Gujarat'),
        ('Sophos Technologies', 'Cybersecurity', 'https://www.sophos.com', 'Abhijit Varma', '9988776659', 'Ahmedabad, Gujarat'),
        ('eInfochips (Arrow Electronics)', 'Product Engineering', 'https://www.einfochips.com', 'Pratul Shroff', '9988776660', 'Ahmedabad, Gujarat'),
        ('Simform', 'Digital Product Engineering', 'https://www.simform.com', 'Hiren Dhaduk', '9988776661', 'Ahmedabad, Gujarat'),
        ('Solution Analysts', 'Mobile & Web Solutions', 'https://www.solutionanalysts.com', 'Kalpesh Patel', '9988776662', 'Ahmedabad, Gujarat'),
        ('Maruti Techlabs', 'AI & Cloud Computing', 'https://www.marutitech.com', 'Nishant Shah', '9988776663', 'Ahmedabad, Gujarat'),
        ('Infolabz IT Services', 'Software & Training', 'https://www.infolabz.in', 'Kunal Patel', '9988776664', 'Rajkot, Gujarat'),
        ('Radixweb', 'Custom Software Development', 'https://radixweb.com', 'Dharmesh Acharya', '9988776665', 'Ahmedabad, Gujarat'),
        ('Logoscorp IT', 'Enterprise Solutions', 'https://logoscorp.com', 'Sanjay Mehta', '9988776666', 'Surat, Gujarat')
      RETURNING id, company_name
    `);
    const companies = companyRes.rows;

    // 3. Insert Students
    console.log('Inserting Students...');
    const studentNames = [
      'Test Student', 'Aarav Patel', 'Diya Sharma', 'Siddharth Mehta', 'Ishani Iyer', 'Vivaan Reddy',
      'Ananya Gupta', 'Kabir Malhotra', 'Zoya Khan', 'Arjun Singh', 'Saanvi Joshi', 'Rohan Verma',
      'Priya Nair', 'Aditya Kulkarni', 'Meera Deshmukh', 'Aryan Jain', 'Tanvi Shah', 'Rahul Chawla',
      'Neelam Bhat', 'Karan Oberoi', 'Sneha Kapoor', 'Vikram Rathore', 'Simran Gill'
    ];
    const passwordHash = await bcrypt.hash('Student@123', 10);
    const students = [];

    for (let i = 0; i < studentNames.length; i++) {
        const name = studentNames[i];
        let email = `${name.toLowerCase().replace(' ', '.')}@rku.ac.in`;
        if (name === 'Test Student') email = 'student@rku.ac.in';
      const isApproved = i < 18; // 18 approved, rest pending

      const userRes = await pool.query(`
        INSERT INTO users (name, email, password_hash, role, is_approved)
        VALUES ($1, $2, $3, 'student', $4) RETURNING id
      `, [name, email, passwordHash, isApproved]);
      
      const userId = userRes.rows[0].id;
      const enrollment = `RKU2026${(100 + i)}`;
      const dept = i % 3 === 0 ? 'B.Tech CSE' : (i % 3 === 1 ? 'B.Tech IT' : 'MCA');
      const city = i % 4 === 0 ? 'Rajkot' : (i % 4 === 1 ? 'Ahmedabad' : (i % 4 === 2 ? 'Surat' : 'Gandhinagar'));

      const profileRes = await pool.query(`
        INSERT INTO students_profile (
          user_id, enrollment_no, department, current_year, semester, cgpa, contact_number,
          personal_email, tenth_percentage, twelfth_percentage, backlogs, parent_name,
          city, state, pincode
        ) VALUES ($1, $2, $3, 4, 8, $4, $5, $6, $7, $8, 0, $9, $10, 'Gujarat', '360001')
        RETURNING id
      `, [
        userId, enrollment, dept, 
        (7.5 + (i * 0.1)).toFixed(2), 
        `998877665${i}`, 
        `${name.toLowerCase().replace(' ', '')}@gmail.com`,
        (80 + i % 15).toFixed(2), (75 + i % 20).toFixed(2),
        `Mr. ${name.split(' ')[1]}`,
        city
      ]);

      students.push({ profileId: profileRes.rows[0].id, name });
    }

    // 4. Insert Jobs
    console.log('Inserting Jobs...');
    const jobs = [];
    const jobTitles = ['Software Engineer', 'Graduate Engineer Trainee', 'Data Analyst', 'Web Developer', 'Systems Engineer', 'Cloud Associate', 'QA Engineer', 'Backend Developer', 'Mobile App Dev', 'Full Stack Developer', 'Network Engineer', 'Product Manager Trainee', 'UI/UX Designer', 'DevOps Specialist', 'Security Analyst'];
    const salaries = ['3.6 LPA', '4.5 LPA', '6.0 LPA', '7.5 LPA', '8.5 LPA', '9.2 LPA', '11 LPA', '12.5 LPA', '15 LPA', '18.2 LPA', '5.8 LPA', '4.2 LPA'];

    // Shuffle companies to avoid sequential repetition
    const shuffledCompanies = [...companies].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 25; i++) {
      const comp = shuffledCompanies[i % shuffledCompanies.length];
      // Randomly pick title and salary to avoid predictable patterns
      const titleLabel = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const salaryLabel = salaries[Math.floor(Math.random() * salaries.length)];
      
      // Status distribution: 15 Approved, 6 Pending, rest Rejected
      const status = i < 15 ? 'approved' : (i < 21 ? 'pending' : 'rejected');
      
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + (Math.floor(Math.random() * 15) + 3)); // 3 to 17 days in future

      const drDate = new Date();
      drDate.setDate(drDate.getDate() + (Math.floor(Math.random() * 15) + 20)); // 20 to 34 days in future
      const joDate = new Date(drDate);
      joDate.setMonth(joDate.getMonth() + 4);

      // Complete details to satisfy frontend validation on Admin & Student dashboards
      const minCgpa = (6.0 + Math.random() * 2.0).toFixed(2); // CGPA between 6.0 and 8.0
      const stipendVal = i % 3 === 0 ? '15,000 INR/Month' : (i % 3 === 1 ? '25,000 INR/Month' : 'No Stipend');
      const bondVal = i % 2 === 0 ? '1 Year' : 'No Bond';
      const internshipDur = i % 2 === 0 ? '6 Months' : '3 Months';
      const selectionProcess = `1. Online Assessment\n2. Technical Interview (Round 1 & 2)\n3. HR & Cultural Fit Interview`;
      const regLink = `https://careers.${comp.company_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/apply`;
      const contactEmail = `hr.${comp.company_name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
      const contactMobile = `+91 99887 766${10 + i}`;
      const contactName = comp.hr_contact_name || 'HR Recruitment Lead';
      const jobWebsite = comp.website || `https://www.${comp.company_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      const requiredSkills = i % 3 === 0 
        ? 'React, Node.js, Express, PostgreSQL, REST APIs' 
        : (i % 3 === 1 ? 'Python, Django, Pandas, SQL, AWS' : 'Java, Spring Boot, Microservices, Hibernate, Docker');

      const jobRes = await pool.query(`
        INSERT INTO jobs (
          company_id, job_title, job_position, job_type, description, status,
          ctc_package, location, application_deadline, eligible_batches, eligible_courses,
          drive_date, joining_date, min_cgpa, stipend, bond, internship_duration,
          selection_process, registration_link, company_name, website,
          contact_person_name, contact_person_email, contact_person_mobile,
          required_skills, additional_info
        ) VALUES (
          $1, $2, $3, 'Full Time', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
        ) RETURNING id, status, job_title
      `, [
        comp.id, titleLabel, titleLabel,
        `Join ${comp.company_name} as a ${titleLabel}. Work on cutting-edge tech in ${comp.location}.`,
        status, salaryLabel, comp.location, deadline,
        ['2025', '2026'], ['B.Tech CSE', 'B.Tech IT', 'MCA'],
        drDate, joDate, minCgpa, stipendVal, bondVal, internshipDur,
        selectionProcess, regLink, comp.company_name, jobWebsite,
        contactName, contactEmail, contactMobile, requiredSkills, 'No additional information.'
      ]);
      jobs.push(jobRes.rows[0]);
    }

    // 5. Insert Applications
    console.log('Inserting Applications...');
    const appStatuses = ['applied', 'shortlisted', 'shortlisted', 'interview', 'interview', 'selected', 'selected', 'rejected', 'applied'];
    for (let i = 0; i < 60; i++) {
        const student = students[i % students.length];
        const job = jobs[i % jobs.length];
        const status = appStatuses[i % appStatuses.length];

        await pool.query(`
            INSERT INTO applications (student_id, job_id, status)
            VALUES ($1, $2, $3)
            ON CONFLICT (student_id, job_id) DO NOTHING
        `, [student.profileId, job.id, status]);
    }

    // 6. Insert Interview Schedules
    console.log('Inserting Interview Schedules...');
    const roundSets = [
        ['Pre-Placement Talk', 'Aptitude Test'],
        ['Coding Round', 'Technical Interview 1', 'HR Round'],
        ['Group Discussion', 'Technical Interview', 'Final Round'],
        ['Technical Interview 1', 'Technical Interview 2', 'Managerial Round', 'HR Round'],
        ['Online Assessment']
    ];

    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        if (job.status === 'approved') {
            const rounds = roundSets[i % roundSets.length];
            for (let r = 0; r < rounds.length; r++) {
                const rDate = new Date();
                rDate.setDate(rDate.getDate() + r + 2);
                await pool.query(`
                    INSERT INTO interview_schedules (job_id, round_name, interview_date, interview_time, mode, venue_or_link)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `, [job.id, rounds[r], rDate, `${9 + r}:00`, r % 2 === 0 ? 'Online' : 'In-Person', r % 2 === 0 ? 'Zoom Meeting' : 'RKU Block-A, Room 204']);
            }
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
            VALUES ($1, $2, $3, $4, $5, CURRENT_DATE - floor(random() * 10)::int)
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
