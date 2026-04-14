import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PasswordActions = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6">
        Security Controls
      </h2>

      <div className="flex flex-col gap-5">

        <button
          onClick={() => navigate("/AdminChangePassword")}
          className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 font-medium shadow-sm transition-all"
        >
          <FaEdit className="text-red-600" />
          Change Password
        </button>

        <button
          onClick={() => navigate("/AdminForgotPassword")}
          className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 font-medium shadow-sm transition-all"
        >
          <FaEdit className="text-red-600" />
          Forgot Password
        </button>

      </div>

    </div>
  );
};

export default PasswordActions;