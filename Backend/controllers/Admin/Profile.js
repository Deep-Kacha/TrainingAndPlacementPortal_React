const pool    = require('../../config/db');
const bcrypt  = require('bcryptjs');

const SUPER_ADMIN_EMAIL = 'admin@rku.ac.in';

// ── Helper: fetch caller email ────────────────────────────────────────────────
const getCallerEmail = async (userId) => {
    const r = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
    return r.rows[0]?.email || '';
};

/**
 * GET /api/admin/profile
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
            return res.status(404).json({ success: false, error: 'Profile not found' });
        }

        const profile = result.rows[0];
        res.status(200).json({
            success: true,
            data: {
                ...profile,
                isSuperAdmin: profile.email === SUPER_ADMIN_EMAIL
            }
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/**
 * PUT /api/admin/profile
 */
const updateAdminProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, employeeId, department, location, mobile } = req.body;

        await pool.query('BEGIN');
        await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userId]);
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

        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error updating admin profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/**
 * POST /api/admin/add-user
 * RESTRICTED: Only super admin (admin@rku.ac.in) can add users.
 */
const addUser = async (req, res) => {
    try {
        const callerEmail = await getCallerEmail(req.userId);
        if (callerEmail !== SUPER_ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                error: 'Only the super admin can add portal users.'
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required.' });
        }

        // Check if already exists
        const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ success: false, error: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (name, email, password_hash, role, is_approved) VALUES ($1, $2, $3, 'admin', true) RETURNING id, email, created_at",
            ['Admin User', email, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: { email, password, id: result.rows[0].id }
        });
    } catch (error) {
        console.error('Error adding portal user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/**
 * GET /api/admin/users
 * Returns all admin users with is_approved status.
 */
const getAllAdminUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, is_approved, created_at FROM users WHERE role = 'admin' ORDER BY created_at ASC"
        );
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching admin users:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/**
 * DELETE /api/admin/users/:id
 * RESTRICTED: Only super admin can remove users. Cannot remove self.
 */
const deleteAdminUser = async (req, res) => {
    try {
        const callerEmail = await getCallerEmail(req.userId);
        if (callerEmail !== SUPER_ADMIN_EMAIL) {
            return res.status(403).json({ success: false, error: 'Only the super admin can remove users.' });
        }

        const { id } = req.params;

        // Cannot delete self
        if (parseInt(id) === req.userId) {
            return res.status(400).json({ success: false, error: 'You cannot delete your own account.' });
        }

        // Cannot delete the super admin account
        const target = await pool.query('SELECT email FROM users WHERE id = $1 AND role = $2', [id, 'admin']);
        if (target.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Admin user not found.' });
        }
        if (target.rows[0].email === SUPER_ADMIN_EMAIL) {
            return res.status(400).json({ success: false, error: 'Cannot delete the super admin account.' });
        }

        await pool.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'admin']);
        res.status(200).json({ success: true, message: 'User removed successfully.' });
    } catch (error) {
        console.error('Error deleting admin user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/**
 * PUT /api/admin/users/:id/toggle
 * RESTRICTED: Only super admin can enable/disable users. Cannot toggle self.
 */
const toggleAdminUser = async (req, res) => {
    try {
        const callerEmail = await getCallerEmail(req.userId);
        if (callerEmail !== SUPER_ADMIN_EMAIL) {
            return res.status(403).json({ success: false, error: 'Only the super admin can enable/disable users.' });
        }

        const { id } = req.params;

        if (parseInt(id) === req.userId) {
            return res.status(400).json({ success: false, error: 'You cannot disable your own account.' });
        }

        // Cannot toggle the super admin account
        const target = await pool.query('SELECT email, is_approved FROM users WHERE id = $1 AND role = $2', [id, 'admin']);
        if (target.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Admin user not found.' });
        }
        if (target.rows[0].email === SUPER_ADMIN_EMAIL) {
            return res.status(400).json({ success: false, error: 'Cannot disable the super admin account.' });
        }

        const newStatus = !target.rows[0].is_approved;
        await pool.query('UPDATE users SET is_approved = $1 WHERE id = $2', [newStatus, id]);

        res.status(200).json({
            success: true,
            message: newStatus ? 'User enabled successfully.' : 'User disabled successfully.',
            is_approved: newStatus
        });
    } catch (error) {
        console.error('Error toggling admin user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    getAdminProfile,
    updateAdminProfile,
    addUser,
    getAllAdminUsers,
    deleteAdminUser,
    toggleAdminUser
};
