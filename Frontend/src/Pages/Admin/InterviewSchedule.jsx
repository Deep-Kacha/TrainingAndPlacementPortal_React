import { useState, useEffect, useMemo } from "react";
import InterviewCard from "../../Components/Admin/InterviewSchedule/InterviewCard";
import { FaSearch, FaChevronDown, FaSpinner } from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";


const AdminInterviewSchedule = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchInterviews();
  }, []);

  useSocketRefresh('REFRESH_INTERVIEWS', fetchInterviews);
  useSocketRefresh('REFRESH_JOBS', fetchInterviews);


  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/interviews", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setCompanies(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const searchTermLower = searchTerm.toLowerCase();
      
      // Backend returns "Scheduled Interview (Pending)" or "Scheduled Interview (Complete)"
      const statusMatch =
        filterStatus === "All" ||
        (filterStatus === "Pending" && company.status?.includes("Pending")) ||
        (filterStatus === "Completed" && company.status?.includes("Complete"));

      if (!statusMatch) return false;

      const name     = company.name?.toLowerCase()     || "";
      const role     = company.role?.toLowerCase()     || "";
      const location = company.location?.toLowerCase() || "";
      const salary   = company.salary?.toLowerCase()   || "";

      if (searchCategory === "All") {
        return name.includes(searchTermLower) || role.includes(searchTermLower) ||
          location.includes(searchTermLower)  || salary.includes(searchTermLower);
      }

      const field = searchCategory === "Company"  ? name :
                    searchCategory === "Role"     ? role :
                    searchCategory === "Location" ? location :
                    searchCategory === "Salary"   ? salary : "";

      return field.includes(searchTermLower);
    });
  }, [companies, searchTerm, searchCategory, filterStatus]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Loading Interview Schedules...</p>
      </div>
    );
  }

  return (
    <div className="w-full">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Interview Schedule
        </h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Manage interview schedules across all job drives.
        </p>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">

          {/* Search Input */}
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder={`Search by ${searchCategory === "All" ? "company, role, location, or salary" : searchCategory.toLowerCase()}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-red-300"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Search Category Dropdown */}
          <div className="relative w-full md:w-48 flex-shrink-0">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full appearance-none p-3 pr-10 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-red-300 cursor-pointer text-gray-700 shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Company">Company Name</option>
              <option value="Role">Job Role</option>
              <option value="Location">Location</option>
              <option value="Salary">Salary</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none p-3 pr-10 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-red-300 cursor-pointer text-gray-700 shadow-sm"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

        </div>

        {/* Interview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <InterviewCard
              key={company.id}
              data={company}
              onScheduleCreated={fetchInterviews}
              onScheduleDeleted={fetchInterviews}
            />
          ))}
        </div>
    </div>
  );
};

export default AdminInterviewSchedule;