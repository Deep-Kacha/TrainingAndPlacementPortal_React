import Sidebar from "../../Components/Admin/SideBar";
import CompanyCard from "../../Components/Admin/CompanyCard";

const CompanyManagement = () => {

  const companies = [1,2,3,4];

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

          {companies.map((item,index)=>(
            <CompanyCard key={index}/>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CompanyManagement;