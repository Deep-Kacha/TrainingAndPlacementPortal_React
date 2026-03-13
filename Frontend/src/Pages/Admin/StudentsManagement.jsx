import { useState } from "react";
import Sidebar from "../../Components/Admin/SideBar";
import StudentRow from "../../Components/Admin/StudentMangement/StudentRow";

const AdminStudentsManagement = () => {

  const [students, setStudents] = useState([
    {
      id:1,
      name:"Aarav Patel",
      enrollment:"21SOECE11001",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"8.9",
      email:"aarav.patel@rku.ac.in",
      approved:true
    },
    {
      id:2,
      name:"Vivaan Shah",
      enrollment:"21SOEIT11023",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"7.8",
      email:"vivaan.shah@rku.ac.in",
      approved:true
    },
    {
      id:3,
      name:"Diya Mehta",
      enrollment:"21SOECE11045",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"9.2",
      email:"diya.mehta@rku.ac.in",
      approved:true
    },
    {
      id:4,
      name:"Ishaan Gupta",
      enrollment:"21SOEIT11056",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"8.1",
      email:"ishaan.gupta@rku.ac.in",
      approved:true
    },
    {
      id:5,
      name:"Riya Singh",
      enrollment:"21SOECE11089",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"8.5",
      email:"riya.singh@rku.ac.in",
      approved:true
    },
    {
      id:6,
      name:"Ananya Roy",
      enrollment:"21SOEIT11012",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"7.6",
      email:"ananya.roy@rku.ac.in",
      approved:true
    },
    {
      id:7,
      name:"Vihaan Kumar",
      enrollment:"21SOECE11034",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"8.7",
      email:"vihaan.kumar@rku.ac.in",
      approved:true
    },
    {
      id:8,
      name:"Aditya Joshi",
      enrollment:"21SOEIT11067",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"9.0",
      email:"aditya.joshi@rku.ac.in",
      approved:true
    },
    {
      id:9,
      name:"Aisha Sharma",
      enrollment:"21SOECE11099",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"8.2",
      email:"aisha.sharma@rku.ac.in",
      approved:true
    },
    {
      id:10,
      name:"Rohan Verma",
      enrollment:"21SOEIT11078",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"7.9",
      email:"rohan.verma@rku.ac.in",
      approved:true
    },
    {
      id:11,
      name:"Priya Reddy",
      enrollment:"21SOECE11015",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"9.5",
      email:"priya.reddy@rku.ac.in",
      approved:true
    },
    {
      id:12,
      name:"Arjun Nair",
      enrollment:"21SOEIT11042",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"8.8",
      email:"arjun.nair@rku.ac.in",
      approved:true
    },
    {
      id:13,
      name:"Saanvi Singh",
      enrollment:"21SOECE11063",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"8.0",
      email:"saanvi.singh@rku.ac.in",
      approved:true
    },
    {
      id:14,
      name:"Kabir Das",
      enrollment:"21SOEIT11081",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"7.5",
      email:"kabir.das@rku.ac.in",
      approved:true
    },
    {
      id:15,
      name:"Myra Desai",
      enrollment:"21SOECE11029",
      course:"B.Tech - CE",
      batch:"2025",
      cgpa:"9.1",
      email:"myra.desai@rku.ac.in",
      approved:true
    },
    {
      id:16,
      name:"Advik Rao",
      enrollment:"21SOEIT11095",
      course:"B.Tech - IT",
      batch:"2025",
      cgpa:"8.4",
      email:"advik.rao@rku.ac.in",
      approved:true
    }
  ]);

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

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
                />
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminStudentsManagement;