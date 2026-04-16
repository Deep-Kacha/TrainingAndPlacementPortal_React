const pool = require('../../config/db');
const { broadcast } = require('../../config/socket');

const getAllStudents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.is_approved, 
                u.created_at,
                sp.enrollment_no, 
                sp.department, 
                sp.current_year, 
                sp.cgpa,
                sp.consent_form_url,
                sp.payment_proof_url,
                sp.personal_email,
                sp.tenth_percentage,
                sp.twelfth_percentage,
                sp.backlogs,
                sp.parent_name,
                sp.parent_email,
                sp.parent_mobile,
                sp.current_address,
                sp.permanent_address,
                sp.city,
                sp.state,
                sp.pincode
            FROM users u
            INNER JOIN students_profile sp ON u.id = sp.user_id
            WHERE u.role IN ('student', 'pending')
            ORDER BY u.created_at DESC
        `);

        // Map database result to frontend representation
        const formattedStudents = result.rows.map(user => ({
            id: user.id,
            name: user.name,
            enrollment: user.enrollment_no,
            course: user.department || "N/A", 
            batch: user.semester ? `Sem ${user.semester}` : "N/A", 
            cgpa: user.cgpa || "N/A",
            email: user.email,
            approved: user.is_approved,
            registeredAt: user.created_at,
            consentFormPath: user.consent_form_url,
            paymentProofPath: user.payment_proof_url,
            personalEmail: user.personal_email,
            tenth: user.tenth_percentage,
            twelfth: user.twelfth_percentage,
            backlogs: user.backlogs,
            parentName: user.parent_name,
            parentEmail: user.parent_email,
            parentMobile: user.parent_mobile,
            currentAddress: user.current_address,
            permanentAddress: user.permanent_address,
            city: user.city,
            state: user.state,
            pincode: user.pincode
        }));

        res.status(200).json(formattedStudents);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch student list." });
    }
};

const approveStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE users SET is_approved = true, role = $1 WHERE id = $2', ['student', id]);
        broadcast('REFRESH_STUDENTS');
        broadcast('REFRESH_STATS');
        res.status(200).json({ success: true, message: "Student approved successfully." });
    } catch (error) {
        console.error("Error approving student:", error);
        res.status(500).json({ success: false, error: "Failed to update student approval status." });
    }
};

const rejectStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE users SET is_approved = false WHERE id = $1', [id]);
        broadcast('REFRESH_STUDENTS');
        broadcast('REFRESH_STATS');
        res.status(200).json({ success: true, message: "Student rejected/set to pending." });
    } catch (error) {
        console.error("Error rejecting student:", error);
        res.status(500).json({ success: false, error: "Failed to update student approval status." });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('BEGIN');
        await pool.query('DELETE FROM applications WHERE student_id = (SELECT id FROM students_profile WHERE user_id = $1)', [id]);
        await pool.query('DELETE FROM students_profile WHERE user_id = $1', [id]);
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        await pool.query('COMMIT');
        broadcast('REFRESH_STUDENTS');
        broadcast('REFRESH_STATS');
        res.status(200).json({ success: true, message: "Student deleted permanently." });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Error deleting student:", error);
        res.status(500).json({ success: false, error: "Failed to delete student." });
    }
};

module.exports = { getAllStudents, approveStudent, rejectStudent, deleteStudent };
