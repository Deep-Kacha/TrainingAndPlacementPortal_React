const pool = require('../../config/db');

/**
 * GET /api/admin/profile
 * Fetches the admin's core data from 'users' and extended data from 'admins_profile'.
 */
const getAdminProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await pool.query(`
            SELECT u.name, u.email, u.role, ap.employee_id as "employeeId", 
                   ap.department, ap.location, ap.mobile
            FROM users u
            LEFT JOIN admins_profile ap ON u.id = ap.user_id
            WHERE u.id = $1
        `, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Profile not found" });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * PUT /api/admin/profile
 * Updates admin data.
 */
const updateAdminProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, employeeId, department, location, mobile } = req.body;

        await pool.query('BEGIN');

        // Update core user table
        await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userId]);

        // Upsert profile table
        await pool.query(`
            INSERT INTO admins_profile (user_id, employee_id, department, location, mobile)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id) DO UPDATE SET 
                employee_id = EXCLUDED.employee_id,
                department  = EXCLUDED.department,
                location    = EXCLUDED.location,
                mobile      = EXCLUDED.mobile
        `, [userId, employeeId, department, location, mobile]);

        await pool.query('COMMIT');
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Error updating admin profile:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * POST /api/admin/add-user
 * Adds a new portal administrator.
 */
const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Check if user already exists
        const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ success: false, error: "User already exists with this email" });
        }

        // 2. Hash password
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert user as verified admin
        await pool.query(
            "INSERT INTO users (name, email, password_hash, role, is_approved) VALUES ($1, $2, $3, 'admin', true)",
            ['Admin User', email, hashedPassword]
        );

        // Returning the plain password here ONLY strictly for the immediate frontend "success" render list.
        res.status(201).json({ success: true, message: "User added successfully", data: { email, password } });
    } catch (error) {
        console.error("Error adding portal user:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * GET /api/admin/users
 * Fetches all users with the 'admin' role.
 */
const getAllAdminUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE role = 'admin' ORDER BY created_at DESC");
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching admin users:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getAdminProfile, updateAdminProfile, addUser, getAllAdminUsers };
