import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import AuthHeader from "../common/AuthHeader";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // 🔹 Future backend call:
    // await resetPassword(formData);

    navigate("/auth/login"); // redirect after reset
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <AuthHeader />

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">
          Reset Password
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Create a new secure password for your account.
        </p>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          {/* New Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">
              New Password
            </label>
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full mt-1 p-2 rounded-md border"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShow({ ...show, new: !show.new })
              }
              className="absolute right-3 top-9 text-sm text-gray-600"
            >
              {show.new ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="w-full mt-1 p-2 rounded-md border"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShow({ ...show, confirm: !show.confirm })
              }
              className="absolute right-3 top-9 text-sm text-gray-600"
            >
              {show.confirm ? "Hide" : "Show"}
            </button>
          </div>

          {/* Password Rules */}
          <div className="bg-gray-100 rounded-md p-4 mb-6 text-sm">
            <p className="font-medium mb-2">
              Password must contain:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>✔ At least 8 characters</li>
              <li>✔ One uppercase letter</li>
              <li>✔ One lowercase letter</li>
              <li>✔ One number</li>
            </ul>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-4"
          >
            Reset Password
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/Authentication/login")}
              className="text-sm hover:underline"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;