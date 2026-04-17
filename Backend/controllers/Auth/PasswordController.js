const bcrypt = require('bcryptjs');
const pool = require('../../config/db');

const validatePasswordStrength = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return null;
};

/**
 * PUT /api/student/change-password
 * Protected route for logged-in students to change their password.
 */
const changeStudentPassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, error: "Please provide both current and new passwords." });
        }

        const strengthError = validatePasswordStrength(newPassword);
        if (strengthError) {
            return res.status(400).json({ success: false, error: strengthError });
        }

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
        console.error("Error changing student password:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * POST /api/auth/forgot-password
 * Public route to reset password if email and enrollment (for students) match.
 */
const forgotPassword = async (req, res) => {
    try {
        const { email, enrollment, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ success: false, error: "Email and new password are required." });
        }

        const strengthError = validatePasswordStrength(newPassword);
        if (strengthError) {
            return res.status(400).json({ success: false, error: strengthError });
        }

        // 1. Find user by email
        const userResult = await pool.query('SELECT id, role FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: "No account found with this email." });
        }

        const user = userResult.rows[0];

        // 2. If student, verify enrollment number for security
        if (user.role === 'student') {
            if (!enrollment) {
                return res.status(400).json({ success: false, error: "Enrollment number is required for verification." });
            }
            const profileResult = await pool.query('SELECT 1 FROM students_profile WHERE user_id = $1 AND enrollment_no = $2', [user.id, enrollment]);
            if (profileResult.rows.length === 0) {
                return res.status(403).json({ success: false, error: "Email and Enrollment Number do not match our records." });
            }
        }

        // 3. Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, user.id]);

        res.status(200).json({ success: true, message: "Password reset successful. You can now login." });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { changeStudentPassword, forgotPassword };
