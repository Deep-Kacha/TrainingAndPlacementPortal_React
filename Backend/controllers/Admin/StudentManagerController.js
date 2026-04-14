const pool = require('../../config/db');

const getAllStudents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.is_approved, 
                sp.enrollment_no, 
                sp.department, 
                sp.current_year, 
                sp.cgpa 
            FROM users u
            INNER JOIN students_profile sp ON u.id = sp.user_id
            WHERE u.role = 'student'
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
            approved: user.is_approved
        }));

        res.status(200).json(formattedStudents);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Failed to fetch student list." });
    }
};

const toggleStudentApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;

        await pool.query('UPDATE users SET is_approved = $1 WHERE id = $2 AND role = $3', [approved, id, 'student']);

        res.status(200).json({ message: `Student status updated to ${approved ? "Approved" : "Pending"}.` });
    } catch (error) {
        console.error("Error toggling approval:", error);
        res.status(500).json({ error: "Failed to update student approval status." });
    }
};

module.exports = { getAllStudents, toggleStudentApproval };
