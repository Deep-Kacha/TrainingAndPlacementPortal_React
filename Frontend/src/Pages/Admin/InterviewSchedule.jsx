import { useState, useMemo } from "react";
import Sidebar from "../../Components/Admin/SideBar";
import InterviewCard from "../../Components/Admin/InterviewSchedule/InterviewCard";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const InterviewSchedule = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const allCompanies = [
    {
      id: 1,
      name: "Multiicon",
      role: "PHP Developer",
      salary: "₹3.6 LPA",
      location: "Rajkot, Gujarat",
      process: "Aptitude + Technical Interview + HR",
      status: "Scheduled Interview (Pending)"
    },
    {
      id: 2,
      name: "Gateway Group of Companies",
      role: "Software Engineer",
      salary: "₹4.5 LPA",
      location: "Ahmedabad, Gujarat",
      process: "Written Test + Technical Round + HR",
      status: "Scheduled Interview (Pending)"
    },
    {
      id: 3,
      name: "Infinity IT Company",
      role: "React Native Developer",
      salary: "₹5 LPA",
      location: "Surat, Gujarat",
      process: "Online Test + Personal Interview",
      status: "On Hold"
    },
    {
      id: 4,
      name: "TCS Ltd",
      role:"Software Development Engineer",
      salary:"₹8 LPA",
      location: "Bangalore, Karnataka",
      process: "Aptitude Test + Personal Interview + Practical Test + Panel Interview",
      status: "Scheduled Interview (Complete)"
    }
  ];

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company => {
      const searchTermLower = searchTerm.toLowerCase();
      const statusMatch = filterStatus === "All" || company.status === filterStatus;

      if (!statusMatch) return false;

      if (searchCategory === "All") {
        return company.name.toLowerCase().includes(searchTermLower) ||
          company.role.toLowerCase().includes(searchTermLower) ||
          company.location.toLowerCase().includes(searchTermLower) ||
          company.salary.toLowerCase().includes(searchTermLower);
      }

      const field = searchCategory === "Company" ? company.name :
                    searchCategory === "Role" ? company.role :
                    searchCategory === "Location" ? company.location :
                    searchCategory === "Salary" ? company.salary : "";
      
      return field.toLowerCase().includes(searchTermLower);
    });
  }, [allCompanies, searchTerm, searchCategory, filterStatus]);


  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Interview Schedule
        </h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Manage interview schedules.
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
              <option value="On Hold">On Hold</option>
              <option value="Scheduled Interview (Pending)">Scheduled Interview (Pending)</option>
              <option value="Scheduled Interview (Complete)">Scheduled Interview (Complete)</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <InterviewCard
              key={company.id}
              data={company}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default InterviewSchedule;