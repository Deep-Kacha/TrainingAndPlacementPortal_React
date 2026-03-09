import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Admin/SideBar";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value, allData) => {
    let error = "";
    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!/^[^\s@]+@rku\.ac\.in$/.test(value)) error = "Only @rku.ac.in email addresses are allowed.";
    } else if (name === "newPassword") {
      if (!value) error = "New password is required.";
      else if (value.length < 8) error = "Must be at least 8 characters.";
      else if (!/[A-Z]/.test(value)) error = "Must contain an uppercase letter.";
      else if (!/[a-z]/.test(value)) error = "Must contain a lowercase letter.";
      else if (!/\d/.test(value)) error = "Must contain a number.";
    } else if (name === "confirmPassword") {
      if (!value) error = "Confirm password is required.";
      else if (value !== allData.newPassword) error = "Passwords do not match.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const error = validateField(name, value, updatedData);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "newPassword" && updatedData.confirmPassword) {
      const confirmError = validateField("confirmPassword", updatedData.confirmPassword, updatedData);
      setErrors((prev) => ({ ...prev, [name]: error, confirmPassword: confirmError }));
    }
  };

  const checkRequirement = (type) => {
    const val = formData.newPassword;
    switch (type) {
      case "length": return val.length >= 8;
      case "upper": return /[A-Z]/.test(val);
      case "lower": return /[a-z]/.test(val);
      case "number": return /\d/.test(val);
      default: return false;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Forgot Password
        </h1>

        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Update your password to recover your account.
        </p>

        {/* Form */}
        <div className="flex justify-center">

          <div className="bg-[#d8cfc3] p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                Registered Email Address
              </label>

              <div className="relative">

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your college email"
                  className={`w-full p-3 rounded-lg border outline-none pl-10 ${errors.email ? "border-red-500" : ""}`}
                />

                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

            </div>


            {/* New Password */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`w-full p-3 rounded-lg border outline-none ${errors.newPassword ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}

            </div>


            {/* Confirm Password */}
            <div className="mb-5">

              <label className="block text-sm mb-1">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className={`w-full p-3 rounded-lg border outline-none ${errors.confirmPassword ? "border-red-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}

            </div>


            {/* Password Rules */}
            <div className="bg-gray-100 p-4 rounded-lg mb-5 text-sm">

              <p className="font-semibold mb-2">
                Password must contain:
              </p>

              <ul className="space-y-1 text-gray-600">

                <li className={checkRequirement("length") ? "text-green-600" : ""}>
                  {checkRequirement("length") ? "✔" : "○"} At least 8 characters
                </li>
                <li className={checkRequirement("upper") ? "text-green-600" : ""}>
                  {checkRequirement("upper") ? "✔" : "○"} One uppercase letter
                </li>
                <li className={checkRequirement("lower") ? "text-green-600" : ""}>
                  {checkRequirement("lower") ? "✔" : "○"} One lowercase letter
                </li>
                <li className={checkRequirement("number") ? "text-green-600" : ""}>
                  {checkRequirement("number") ? "✔" : "○"} One number
                </li>

              </ul>

            </div>


            {/* Confirm Button */}
            <button className="w-full bg-red-600 text-white py-3 rounded-lg mb-3 hover:bg-red-700">
              Confirm Password
            </button>


            {/* Cancel Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full border py-3 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;