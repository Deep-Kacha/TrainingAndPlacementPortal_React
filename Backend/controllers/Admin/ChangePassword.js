const bcrypt = require('bcryptjs');
const pool = require('../../config/db');

/**
 * PUT /api/admin/change-password
 * Updates the logged-in administrator's password.
 */
const changePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;

        // 1. Fetch user
        const userResult = await pool.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const user = userResult.rows[0];

        // 2. Compare current password
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid current password" });
        }

        // 3. Hash and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { changePassword };
