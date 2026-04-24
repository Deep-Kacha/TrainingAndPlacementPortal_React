import { useState, useEffect } from "react";
import { FaBuilding, FaUsers, FaCheckCircle, FaSpinner } from "react-icons/fa";

const CompanyDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/company/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch company stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { title: "Total Job Postings", count: stats?.totalJobs || 0, icon: <FaBuilding className="text-3xl text-blue-600" />, bg: "bg-blue-100" },
    { title: "Total Applications", count: stats?.totalApplicants || 0, icon: <FaUsers className="text-3xl text-orange-600" />, bg: "bg-orange-100" },
    { title: "Students Hired", count: stats?.totalHired || 0, icon: <FaCheckCircle className="text-3xl text-green-600" />, bg: "bg-green-100" }
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">Company Dashboard</h1>
        <p className="text-gray-600">Welcome to your hiring portal overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className={`p-4 rounded-full ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
