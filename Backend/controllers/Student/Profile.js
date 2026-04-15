const pool = require('../../config/db');

/**
 * GET /api/student/profile
 * Returns the student's personal and academic profile.
 */
const getStudentProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await pool.query(`
            SELECT 
                u.name, 
                u.email, 
                sp.*
            FROM users u
            JOIN students_profile sp ON u.id = sp.user_id
            WHERE u.id = $1
        `, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Profile not found" });
        }

        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

/**
 * PUT /api/student/profile
 * Updates the student's profile.
 */
const updateStudentProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const data = req.body;

        const query = `
            UPDATE students_profile SET 
                enrollment_no = $1, department = $2, current_year = $3, semester = $4,
                cgpa = $5, contact_number = $6, personal_email = $7,
                tenth_percentage = $8, twelfth_percentage = $9, backlogs = $10,
                parent_name = $11, current_address = $12, permanent_address = $13,
                city = $14, state = $15, pincode = $16, resume_url = $17
            WHERE user_id = $18
        `;

        const values = [
            data.enrollment_no, data.department, data.current_year, data.semester,
            data.cgpa, data.contact_number, data.personal_email,
            data.tenth_percentage, data.twelfth_percentage, data.backlogs,
            data.parent_name, data.current_address, data.permanent_address,
            data.city, data.state, data.pincode, data.resume_url,
            userId
        ];

        await pool.query(query, values);
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getStudentProfile, updateStudentProfile };
