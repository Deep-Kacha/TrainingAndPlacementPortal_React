-- =========================================================
-- PostgreSQL Database Schema for Training and Placement Portal
-- Optimized for Performance, Versatility, and Scalability
-- =========================================================

-- 1. Create Enum Types for fixed values
CREATE TYPE user_role AS ENUM ('admin', 'student', 'company');
CREATE TYPE job_status AS ENUM ('pending', 'approved', 'rejected', 'closed');
CREATE TYPE application_status AS ENUM ('applied', 'shortlisted', 'interview', 'selected', 'rejected');

-- 2. Users Table (Core Auth Table)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- TIMESTAMPTZ is recommended for timezone awareness
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Index for filtering by role (e.g. fetching all students or admins)
CREATE INDEX idx_users_role ON users(role);


-- 3. Students Profile Table
CREATE TABLE students_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    enrollment_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100),
    current_year INTEGER,
    semester INTEGER,
    cgpa DECIMAL(4,2) CHECK (cgpa >= 0 AND cgpa <= 10.00), -- Constraining CGPA bounds
    resume_url TEXT,
    contact_number VARCHAR(80) -- Allow international formats/extensions
);
-- Index on department for quick filtering of students by branch
CREATE INDEX idx_students_dept ON students_profile(department);


-- 4. Companies Profile Table
CREATE TABLE companies_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    hr_contact_name VARCHAR(100),
    hr_contact_phone VARCHAR(80),
    location TEXT
);
-- Index on company name for searching
CREATE INDEX idx_companies_name ON companies_profile(company_name);


-- 5. Jobs / Job Descriptions Table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies_profile(id) ON DELETE CASCADE,
    job_title VARCHAR(255) NOT NULL,
    job_type VARCHAR(100), -- e.g., Full-time, Internship
    description TEXT NOT NULL,
    required_skills TEXT,
    eligibility_criteria TEXT,
    ctc_package VARCHAR(100),
    location VARCHAR(255),
    application_deadline DATE,
    status job_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- PostgreSQL does NOT automatically index foreign keys. Creating manually for JOIN performance:
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
-- Index on status and deadline to quickly fetch active jobs for students
CREATE INDEX idx_jobs_status_deadline ON jobs(status, application_deadline);


-- 6. Job Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students_profile(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    status application_status DEFAULT 'applied',
    applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, job_id) -- A student can apply to a specific job only once
);
-- FK Indexes for rapid JOINs on students seeing their applications, or HR seeing applicants for a job
CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
-- Index on status for filtering applications
CREATE INDEX idx_applications_status ON applications(status);


-- 7. Interview Schedules Table
CREATE TABLE interview_schedules (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    round_name VARCHAR(100) NOT NULL,
    interview_date DATE NOT NULL,
    interview_time TIME NOT NULL,
    mode VARCHAR(50), -- e.g., Online, Offline
    venue_or_link TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Index on job_id for quick retrieval of all schedules for a specific job
CREATE INDEX idx_interview_schedules_job_id ON interview_schedules(job_id);
-- Index on dates for querying upcoming interviews across the system
CREATE INDEX idx_interview_schedules_date ON interview_schedules(interview_date);


-- 8. Interview Participants Table (Mapping students to specific interviews)
CREATE TABLE interview_participants (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER REFERENCES interview_schedules(id) ON DELETE CASCADE,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'scheduled', -- e.g., scheduled, attended, missed
    UNIQUE(schedule_id, application_id)
);
-- FK Indexes
CREATE INDEX idx_participants_schedule_id ON interview_participants(schedule_id);
CREATE INDEX idx_participants_application_id ON interview_participants(application_id);


-- 9. Placement History Table (Records of successfully placed students)
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
-- FK Indexes for looking up a student's placement history or all placements for a job
CREATE INDEX idx_placement_history_student_id ON placement_history(student_id);
CREATE INDEX idx_placement_history_job_id ON placement_history(job_id);


-- 10. Optional: Trigger to automatically update `updated_at` column in users table
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
