import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const InterviewCard = ({ data }) => {
  const [isOnHold, setIsOnHold] = useState(false);
  const navigate = useNavigate(); 
  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow">

      {/* Header */}

      <div className="flex items-center gap-4 mb-3">

        <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold">
          {data?.name ? data.name.charAt(0) : "C"}
        </div>

        <div>
          <h3 className="font-bold text-lg">
            {data?.name || "Company Name"}
          </h3>

          <p className="text-gray-600 text-sm">
            {data?.role || "Job Role"}
          </p>
        </div>

      </div>


      {/* Salary */}

      <p className="text-red-600 font-bold text-lg mb-2">
        {data?.salary || "₹8 LPA"}
      </p>


      {/* Location */}

      <p className="flex items-center gap-2 text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt />
        {data?.location || "Bangalore, Karnataka"}
      </p>


      {/* Process */}

      <p className="text-gray-600 text-sm mb-4">
        {data?.process ||
          "Aptitude Test + Personal Interview + Practical Test + Panel Interview"}
      </p>


      {/* Buttons */}

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => setIsOnHold(!isOnHold)}
          className={`${isOnHold ? "bg-gray-500 hover:bg-gray-600" : "bg-orange-500 hover:bg-orange-600"} text-white py-2 rounded`}
        >
          ON HOLD
        </button>

        <button 
          onClick={() => navigate("/InterviewScheduleForm")}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          SCHEDULE INTERVIEW
        </button>

      </div>

    </div>
  );
};

export default InterviewCard;