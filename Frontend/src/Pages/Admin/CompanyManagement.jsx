import { useState, useEffect } from "react";
import Sidebar from "../../Components/Admin/SideBar";
import CompanyCard from "../../Components/Admin/CompanyCard";

const CompanyManagement = () => {

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Multiicon",
      role: "PHP Developer",
      salary: "₹3.6 LPA",
      location: "Rajkot, Gujarat",
      process: "Aptitude + Technical Interview + HR",
      status: "pending"
    },
    {
      id: 2,
      name: "Gateway Group of Companies",
      role: "Software Engineer",
      salary: "₹4.5 LPA",
      location: "Ahmedabad, Gujarat",
      process: "Written Test + Technical Round + HR",
      status: "pending"
    },
    {
      id: 3,
      name: "Infinity IT Company",
      role: "React Native Developer",
      salary: "₹5 LPA",
      location: "Surat, Gujarat",
      process: "Online Test + Personal Interview",
      status: "pending"
    },
    {
      id: 4,
      name: "TCS Ltd",
      role: "Software Development Engineer",
      salary: "₹8 LPA",
      location: "Bangalore, Karnataka",
      process: "Aptitude Test + Personal Interview + Practical Test + Panel Interview",
      status: "pending"
    }
  ]);

  const [undoState, setUndoState] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    const company = companies.find(c => c.id === id);
    if (undoState) clearTimeout(undoState.timeout);

    const timeout = setTimeout(() => {
      setUndoState(null);
    }, 5000);

    setUndoState({ id, prevStatus: company.status, timeout });

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

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Company Management
        </h1>

        <p className="text-gray-600 mb-8">
          Manage and maintain company information and records.
        </p>

        {/* Company Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {companies.map((item) => (
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

    </div>
  );
};

export default CompanyManagement;