import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/SideBar";

const ChangePassword = () => {

  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const validateField = (name, value, allPasswords) => {
    let error = "";
    if (name === "current") {
      if (!value) error = "Current password is required.";
    } else if (name === "new") {
      if (!value) error = "New password is required.";
      else if (value.length < 8) error = "Must be at least 8 characters.";
      else if (!/[A-Z]/.test(value)) error = "Must contain an uppercase letter.";
      else if (!/[a-z]/.test(value)) error = "Must contain a lowercase letter.";
      else if (!/\d/.test(value)) error = "Must contain a number.";
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Must contain a special character.";
    } else if (name === "confirm") {
      if (!value) error = "Confirm password is required.";
      else if (value !== allPasswords.new) error = "Passwords do not match.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedPasswords = { ...passwords, [name]: value };
    setPasswords(updatedPasswords);

    const error = validateField(name, value, updatedPasswords);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "new" && updatedPasswords.confirm) {
      const confirmError = validateField("confirm", updatedPasswords.confirm, updatedPasswords);
      setErrors((prev) => ({ ...prev, [name]: error, confirm: confirmError }));
    }
  };

  const checkRequirement = (type) => {
    const val = passwords.new;
    switch (type) {
      case "length": return val.length >= 8;
      case "upper": return /[A-Z]/.test(val);
      case "lower": return /[a-z]/.test(val);
      case "number": return /\d/.test(val);
      case "special": return /[!@#$%^&*(),.?":{}|<>]/.test(val);
      default: return false;
    }
  };

  return (

    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Change Password
        </h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Update your account password for better security.
        </p>

        {/* Form Container */}
        <div className="flex justify-center">

          <div className="bg-[#d8cfc3] p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">

            {/* Current Password */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showCurrent ? "text" : "password"}
                  name="current"
                  value={passwords.current}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className={`w-full p-3 rounded-lg border outline-none ${errors.current ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
            </div>


            {/* New Password */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNew ? "text" : "password"}
                  name="new"
                  value={passwords.new}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`w-full p-3 rounded-lg border outline-none ${errors.new ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
            </div>


            {/* Confirm Password */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                Confirm New Password
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handleChange}
                  placeholder="Re-Enter new password"
                  className={`w-full p-3 rounded-lg border outline-none ${errors.confirm ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>


            {/* Password Requirements */}
            <div className="bg-gray-100 p-4 rounded-lg mb-5 text-sm">

              <p className="font-semibold mb-2">
                Password requirements:
              </p>

              <ul className="space-y-1 text-gray-600">

                <li className={checkRequirement("length") ? "text-green-600" : ""}>
                  {checkRequirement("length") ? "✔" : "○"} At least 8 characters long
                </li>
                <li className={checkRequirement("upper") && checkRequirement("lower") ? "text-green-600" : ""}>
                  {checkRequirement("upper") && checkRequirement("lower") ? "✔" : "○"} Contains uppercase and lowercase letters
                </li>
                <li className={checkRequirement("number") ? "text-green-600" : ""}>
                  {checkRequirement("number") ? "✔" : "○"} Contains at least one number
                </li>
                <li className={checkRequirement("special") ? "text-green-600" : ""}>
                  {checkRequirement("special") ? "✔" : "○"} Contains at least one special character
                </li>

              </ul>

            </div>


            {/* Forgot Password */}
            <div className="text-right text-sm mb-4">
              <button
                className="text-gray-700"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>


            {/* Update Button */}
            <button className="w-full bg-red-600 text-white py-3 rounded-lg mb-3 hover:bg-red-700">
              Update Password
            </button>


            {/* Cancel */}
            <button className="w-full border py-3 rounded-lg">
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;