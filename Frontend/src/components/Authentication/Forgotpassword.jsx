import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const ForgotPassword = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Forgot Password
        </h1>

        {/* Card */}
        <div className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">
              Registered Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your college email"
              className="w-full mt-1 p-2 rounded-md border"
            />
          </div>

          {/* New Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">New Password</label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full mt-1 p-2 rounded-md border"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 text-sm text-gray-600"
            >
              {showNew ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              className="w-full mt-1 p-2 rounded-md border"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-sm text-gray-600"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          {/* Password Rules Box */}
          <div className="bg-gray-100 rounded-md p-4 mb-6 text-sm">
            <p className="font-medium mb-2">Password must contain:</p>
            <ul className="space-y-1 text-gray-700">
              <li>✔ At least 8 characters</li>
              <li>✔ One uppercase letter</li>
              <li>✔ One lowercase letter</li>
              <li>✔ One number</li>
            </ul>
          </div>

          {/* Buttons */}
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3">
            Confirm Password
          </button>

          <button className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition">
            Cancel
          </button>

        </div>
      </div>

      <Footer />

    </div>
  );
};

export default ForgotPassword;