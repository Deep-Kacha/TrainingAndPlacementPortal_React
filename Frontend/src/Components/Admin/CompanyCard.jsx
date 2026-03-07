import { FaMapMarkerAlt } from "react-icons/fa";

const CompanyCard = () => {
  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow">

      {/* Header */}

      <div className="flex items-center gap-4 mb-3">

        <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold">
          T
        </div>

        <div>
          <h3 className="font-bold text-lg">TCS Ltd</h3>
          <p className="text-gray-600 text-sm">
            Software Development Engineer
          </p>
        </div>

      </div>

      {/* Salary */}

      <p className="text-red-600 font-bold text-lg mb-2">
        ₹8 LPA
      </p>

      {/* Location */}

      <p className="flex items-center gap-2 text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt />
        Bangalore, Karnataka
      </p>

      {/* Selection Process */}

      <p className="text-gray-600 text-sm mb-4">
        Aptitude Test + Personal Interview + Practical Test + Panel Interview
      </p>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mb-3">

        <button className="bg-red-600 text-white py-2 rounded">
          ✕ DECLINE
        </button>

        <button className="bg-green-600 text-white py-2 rounded">
          ✓ ACCEPT
        </button>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <button className="border border-black py-2 rounded">
          VIEW DETAILS
        </button>

        <button className="bg-blue-600 text-white py-2 rounded">
          EDIT DETAILS
        </button>

      </div>

    </div>
  );
};

export default CompanyCard;