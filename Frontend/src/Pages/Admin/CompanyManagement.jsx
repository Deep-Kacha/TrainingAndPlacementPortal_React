import { useState, useEffect, useMemo } from "react";
import CompanyCard from "../../Components/Admin/CompanyMangement/CompanyCard";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";

const AdminCompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [undoState, setUndoState] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/companies", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setCompanies(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useSocketRefresh('REFRESH_JOBS', fetchCompanies);

  const updateStatusInBackend = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/companies/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error("Failed to update status in backend", error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const company = companies.find(c => c.id === id);
    if (!company) return;

    if (undoState) {
        // Carry out the previous pending update immediately if a new one starts
        updateStatusInBackend(undoState.id, undoState.targetStatus);
        clearTimeout(undoState.timeout);
    }

    const timeout = setTimeout(() => {
      updateStatusInBackend(id, newStatus);
      setUndoState(null);
    }, 5000);

    setUndoState({ id, prevStatus: company.status, targetStatus: newStatus, timeout });

    setCompanies(companies.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const handleUndo = () => {
    if (!undoState) return;
    clearTimeout(undoState.timeout);
    
    setCompanies(companies.map(c => 
      c.id === undoState.id ? { ...c, status: undoState.prevStatus } : c
    ));
    setUndoState(null);
  };


  useEffect(() => {
    return () => {
      if (undoState) clearTimeout(undoState.timeout);
    };
  }, [undoState]);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
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
  }, [companies, searchTerm, searchCategory, filterStatus]);

  return (
    <div className="w-full">

        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Company Management
        </h1>

        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Manage and maintain company information and records.
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
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved / Open</option>
              <option value="rejected">Rejected</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredCompanies.map((item) => (
            <CompanyCard
              key={item.id}
              data={item}
              onStatusChange={handleStatusChange}
              undoState={undoState}
              onUndo={handleUndo}
            />
          ))}
        </div>
    </div>
  );
};

export default AdminCompanyManagement;