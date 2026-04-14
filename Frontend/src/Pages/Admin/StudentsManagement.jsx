import { useState, useEffect } from "react";
import StudentRow from "../../Components/Admin/StudentMangement/StudentRow";

const AdminStudentsManagement = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/admin/students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if(res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleApprove = async (id, approved) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/students/${id}/approve`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ approved })
      });
      if(res.ok) {
        setStudents(students.map(s => s.id === id ? { ...s, approved } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="w-full">

        {/* Header */}
        <div className="mb-6">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
              Students Management
            </h1>

            <p className="text-gray-600 text-sm md:text-base">
              Manage student registrations and approvals.
            </p>
          </div>

        </div>


        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left min-w-[800px]">

            <thead className="bg-white text-sm border-b">

              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Enrollment No.</th>
                <th className="p-4">Course / Branch</th>
                <th className="p-4">Batch</th>
                <th className="p-4">CGPA</th>
                <th className="p-4">Email</th>
                <th className="p-4">Approval</th>
                <th className="p-4">Delete</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  onDelete={deleteStudent}
                  onApprove={toggleApprove}
                />
              ))}

            </tbody>

          </table>

        </div>

    </div>
  );
};

export default AdminStudentsManagement;