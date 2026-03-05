import React from "react";
import logo from "../../assets/images/logo.png";

const AuthHeader = () => {
  return (
    <header className="bg-gray-100 border-b">
      <div className="flex justify-between items-center px-6 py-3">
        
        {/* Left Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="RK University Logo" className="h-10" />
          <div>
            <h1 className="text-red-600 font-bold text-sm">T&P Portal</h1>
            <p className="text-xs text-gray-600">
              RKU Training & Placement Management
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;