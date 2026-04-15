const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');

// POST /api/auth/register
const registerStudent = async (req, res) => {
    try {
        const { 
            name, universityEmail, password, enrollment, branch, semester, cgpa, mobile,
            personalEmail, tenth, twelfth, backlogs, parentName, parentEmail, parentMobile, 
            currentAddress, permanentAddress, city, state, pincode
        } = req.body;
        
        const consentForm = req.files && req.files['consentForm'] ? req.files['consentForm'][0].filename : null;
        const paymentProof = req.files && req.files['paymentProof'] ? req.files['paymentProof'][0].filename : null;

        // Basic validation
        if (!name || !universityEmail || !password || !enrollment) {
            return res.status(400).json({ error: "Please provide all required fields." });
        }

        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [universityEmail]);
        if (userCheck.rows.length > 0) return res.status(400).json({ error: "Email already registered." });

        const hashedPw = await bcrypt.hash(password, 10);
        
        // Use a transaction
        await pool.query('BEGIN');
        
        const userInsert = await pool.query(
            "INSERT INTO users (name, email, password_hash, role, is_approved) VALUES ($1, $2, $3, 'student', false) RETURNING id",
            [name, universityEmail, hashedPw]
        );
        const userId = userInsert.rows[0].id;

        await pool.query(
            `INSERT INTO students_profile (
                user_id, enrollment_no, department, semester, cgpa, contact_number, 
                consent_form_url, payment_proof_url, personal_email, tenth_percentage, 
                twelfth_percentage, backlogs, parent_name, parent_email, parent_mobile, 
                current_address, permanent_address, city, state, pincode
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
            [
                userId, enrollment, branch, semester, cgpa, mobile, consentForm, paymentProof,
                personalEmail, tenth, twelfth, backlogs || 0, parentName, parentEmail, parentMobile,
                currentAddress, permanentAddress, city, state, pincode
            ]
        );

        await pool.query('COMMIT');
        res.status(201).json({ message: "Registration successful. Pending admin approval." });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Register error:", error);
        res.status(500).json({ error: "Server error during registration." });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Find User
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role.toLowerCase()]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials or role." });
        }

        const user = userResult.rows[0];

        // Ensure Password matches
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials." });

        // Reject if student isn't approved
        if (user.role === 'student' && !user.is_approved) {
            return res.status(403).json({ error: "Your account is pending admin approval." });
        }

        // Sign JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name }, 
            process.env.JWT_SECRET || 'your_super_secret_key', 
            { expiresIn: '8h' }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user.id, name: user.name, role: user.role } 
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error during login." });
    }
};

module.exports = { registerStudent, login };
