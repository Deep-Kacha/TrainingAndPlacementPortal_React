import React, { useState } from "react";
import Footer from "../../components/common/Footer";
import AuthHeader from "../common/AuthHeader";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
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
    // 🔹 Later connect to backend:
    // await updatePassword(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <AuthHeader />

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold">
          Change Password
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Update your account password for better security.
        </p>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          {/* Current Password */}
          <div className="mb-4 relative">
            <label className="text-sm font-medium">
              Current Password
            </label>
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full mt-1 p-2 rounded-md border"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShow({ ...show, current: !show.current })
              }
              className="absolute right-3 top-9 text-sm text-gray-600"
            >
              {show.current ? "Hide" : "Show"}
            </button>
          </div>

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
              Confirm New Password
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

          {/* Requirements Box */}
          <div className="bg-gray-100 rounded-md p-4 mb-6 text-sm">
            <p className="font-medium mb-2">
              Password requirements:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>✔ At least 8 characters long</li>
              <li>✔ Contains uppercase and lowercase letters</li>
              <li>✔ Contains at least one number</li>
              <li>✔ Contains at least one special character</li>
            </ul>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3"
          >
            Update Password
          </button>

          <button
            type="button"
            className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;