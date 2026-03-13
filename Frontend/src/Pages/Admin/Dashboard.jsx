
import { useNavigate } from "react-router-dom";
import StatCard from "../../Components/Admin/Dashboard/StatCard";
import QuickActionCard from "../../Components/Admin/Dashboard/QuickActionCard";
import JdDetail from "./JdDetail";
  

import {
  FaUsers,
  FaClock,
  FaBriefcase,
  FaFileAlt,
  FaCheckCircle,
  FaTrophy,
  FaSearch
} from "react-icons/fa";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      icon: <FaUsers className="text-blue-600 text-xl" />,
      bg: "bg-blue-100"
    },
    {
      title: "Pending Approvals",
      value: "23",
      icon: <FaClock className="text-red-600 text-xl" />,
      bg: "bg-red-100"
    },
    {
      title: "Active Job Drives",
      value: "15",
      icon: <FaBriefcase className="text-blue-600 text-xl" />,
      bg: "bg-blue-100"
    },
    {
      title: "Total Applications",
      value: "1,256",
      icon: <FaFileAlt className="text-blue-600 text-xl" />,
      bg: "bg-blue-100"
    },
    {
      title: "Shortlisted Students",
      value: "342",
      icon: <FaCheckCircle className="text-blue-600 text-xl" />,
      bg: "bg-blue-100"
    },
    {
      title: "Selected Students",
      value: "189",
      icon: <FaTrophy className="text-blue-600 text-xl" />,
      bg: "bg-blue-100"
    }
  ];

  return (
    <div className="w-full">

        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Overview of placement activities and statistics.
        </p>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              bg={item.bg}
            />
          ))}

        </div>

        {/* Quick Actions */}

        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <QuickActionCard
            title="Companies"
            description="Explore Company details and JD"
            icon={<FaBriefcase className="text-orange-500" />}
            buttonText="View Companies →"
            linkColor="text-orange-500"
            onClick={() => navigate("/AdminCompanyManagement")}
          />

          <QuickActionCard
            title="Students"
            description="Explore Student Details"
            icon={<FaSearch className="text-cyan-500" />}
            buttonText="View Student Details →"
            linkColor="text-cyan-500"
            onClick={() => navigate("/AdminStudentsManagement")}
          />

          <QuickActionCard
            title="Interview Schedule"
            description="Manage Interviews"
            icon={<FaFileAlt className="text-blue-600" />}
            buttonText="View Schedules →"
            linkColor="text-blue-600"
            onClick={() => navigate("/AdminInterviewSchedule")}
          />

          <QuickActionCard
            title="History"
            description="Explore Placement History"
            icon={<FaClock className="text-red-500" />}
            buttonText="View Placement History →"
            linkColor="text-red-500"
            onClick={() => navigate("/AdminPlacementHistory")}
          />

          <QuickActionCard
            title="Profile"
            description="Update your information"
            icon={<FaUsers className="text-purple-500" />}
            buttonText="Edit Profile →"
            linkColor="text-purple-500"
            onClick={() => navigate("/AdminProfile")}
          />

        </div>

    </div>
  );
};

export default AdminDashboard;