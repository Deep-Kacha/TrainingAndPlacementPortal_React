import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-100 border-b">
      <div className="flex justify-between items-center px-6 py-3">

        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="RK University Logo" className="h-10" />
          <div>
            <h1 className="text-red-600 font-bold text-sm">T&P Portal</h1>
            <p className="text-xs text-gray-600">RKU Training & Placement Management</p>
          </div>
        </div>

        {/* Right: Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700
                     border border-gray-300 bg-white hover:bg-gray-50
                     px-4 py-2 rounded-lg transition-all shadow-sm"
        >
          ← Back to Home
        </button>

      </div>
    </header>
  );
};

export default AuthHeader;