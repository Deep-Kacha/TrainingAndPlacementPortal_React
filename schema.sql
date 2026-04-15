-- =========================================================
-- PostgreSQL Database Schema for Training and Placement Portal
-- Optimized for Performance, Versatility, and Scalability
-- =========================================================

-- DROP existing tables and types to ensure a clean slate
DROP TABLE IF EXISTS placement_history CASCADE;
DROP TABLE IF EXISTS interview_participants CASCADE;
DROP TABLE IF EXISTS interview_schedules CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS companies_profile CASCADE;
DROP TABLE IF EXISTS students_profile CASCADE;
DROP TABLE IF EXISTS admins_profile CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS job_status CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;

-- 1. Create Enum Types for fixed values
CREATE TYPE user_role AS ENUM ('admin', 'student');
CREATE TYPE job_status AS ENUM ('pending', 'approved', 'rejected', 'closed');
CREATE TYPE application_status AS ENUM ('applied', 'shortlisted', 'interview', 'selected', 'rejected');

-- 2. Users Table (Core Auth Table)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_role ON users(role);

-- 3. Admins Profile Table (NEW)
CREATE TABLE admins_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(100),
    department VARCHAR(100),
    location VARCHAR(100),
    mobile VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Students Profile Table (EXPANDED TO MATCH AUTH CONTROLLER)
CREATE TABLE students_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    enrollment_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100),
    current_year INTEGER,
    semester INTEGER,
    cgpa DECIMAL(4,2) CHECK (cgpa >= 0 AND cgpa <= 10.00),
    resume_url TEXT,
    contact_number VARCHAR(80),
    -- New Fields from AuthController
    consent_form_url TEXT,
    payment_proof_url TEXT,
    personal_email VARCHAR(255),
    tenth_percentage DECIMAL(5,2),
    twelfth_percentage DECIMAL(5,2),
    backlogs INTEGER DEFAULT 0,
    parent_name VARCHAR(255),
    parent_email VARCHAR(255),
    parent_mobile VARCHAR(50),
    current_address TEXT,
    permanent_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20)
);
CREATE INDEX idx_students_dept ON students_profile(department);

-- 5. Companies Profile Table
-- Acts as a robust root entity for registered companies (no longer linked to user accounts).
CREATE TABLE companies_profile (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    hr_contact_name VARCHAR(100),
    hr_contact_phone VARCHAR(80),
    location TEXT
);
CREATE INDEX idx_companies_name ON companies_profile(company_name);

-- 6. Jobs / Job Descriptions Table (EXPANDED TO MATCH GUEST SUBMIT JD)
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    -- NULLable to support unregistered guests submitting a JD via the portal
    company_id INTEGER REFERENCES companies_profile(id) ON DELETE CASCADE, 
    
    -- Core Job Fields
    job_title VARCHAR(255) NOT NULL,
    job_position VARCHAR(255), 
    job_type VARCHAR(100),
    description TEXT NOT NULL,
    required_skills TEXT,
    eligibility_criteria TEXT,
    
    -- Compensation & Terms
    ctc_package VARCHAR(100),
    stipend VARCHAR(100),
    bond VARCHAR(255),
    
    -- Execution details
    location VARCHAR(255),
    joining_date DATE,
    internship_duration VARCHAR(100),
    
    -- Eligibility Requirements (Using ARRAY to support multi-selects from frontend)
    eligible_batches VARCHAR(100)[],
    eligible_courses VARCHAR(100)[],
    
    -- Process Details
    selection_process TEXT,
    drive_date DATE,
    registration_link VARCHAR(255),
    application_deadline DATE,
    
    -- Contact Information for JD (Often different from the global company HR info)
    company_name VARCHAR(255), -- Guest Company Support
    website VARCHAR(255),      -- Guest Company Support
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255),
    contact_person_mobile VARCHAR(80),
    additional_info TEXT,
    
    status job_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_status_deadline ON jobs(status, application_deadline);

-- 7. Job Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students_profile(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    status application_status DEFAULT 'applied',
    applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, job_id)
);
CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);

-- 8. Interview Schedules Table
CREATE TABLE interview_schedules (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    round_name VARCHAR(100) NOT NULL,
    interview_date DATE NOT NULL,
    interview_time TIME NOT NULL,
    mode VARCHAR(50), 
    venue_or_link TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_interview_schedules_job_id ON interview_schedules(job_id);
CREATE INDEX idx_interview_schedules_date ON interview_schedules(interview_date);

-- 9. Interview Participants Table
CREATE TABLE interview_participants (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER REFERENCES interview_schedules(id) ON DELETE CASCADE,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'scheduled',
    UNIQUE(schedule_id, application_id)
);
CREATE INDEX idx_participants_schedule_id ON interview_participants(schedule_id);
CREATE INDEX idx_participants_application_id ON interview_participants(application_id);

-- 10. Placement History Table
CREATE TABLE placement_history (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students_profile(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    ctc_offered VARCHAR(100),
    offer_letter_url TEXT,
    placement_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_placement_history_student_id ON placement_history(student_id);
CREATE INDEX idx_placement_history_job_id ON placement_history(job_id);

-- 11. Optional: Trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
