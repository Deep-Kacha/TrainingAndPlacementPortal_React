import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const validateField = (name, value, allData) => {
    let error = "";
    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address.";
    } else if (name === "newPassword") {
      if (!value) error = "New password is required.";
      else if (value.length < 8) error = "Must be at least 8 characters.";
      else if (!/[A-Z]/.test(value)) error = "Must contain an uppercase letter.";
      else if (!/[a-z]/.test(value)) error = "Must contain a lowercase letter.";
      else if (!/\d/.test(value)) error = "Must contain a number.";
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Must contain a special character.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key], formData);
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(err => err !== "");
    if (!hasErrors) {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.newPassword
          })
        });

        const result = await res.json();
        if (result.success) {
          showToast("Password reset successfully! Redirecting to login...", "success");
          setTimeout(() => navigate(-1), 3000);
        } else {
          showToast(result.error || "Failed to reset password.", "error");
        }
      } catch (error) {
        showToast("Network error. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Recover Admin Account
        </h1>
        <p className="text-gray-600 mb-8">
          Update your admin credentials to regain access to the management portal.
        </p>

        {/* Form Container */}
        <div className="flex justify-center">

          <form onSubmit={handleSubmit} className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

            <h2 className="text-xl font-bold text-center mb-2">
              Reset Admin Password
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Establish new security credentials
            </p>

            {/* Toast */}
            {toast.visible && (
              <div className={`mb-6 p-3 rounded-md text-sm font-medium border ${
                toast.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
              }`}>
                {toast.message}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className={`w-full p-2 pl-8 rounded-md border ${errors.email ? "border-red-500" : ""}`}
                />
                <FaEnvelope className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`w-full p-2 rounded-md border ${errors.newPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">Confirm New Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className={`w-full p-2 rounded-md border ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>



            {/* Actions */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3 font-semibold shadow-sm"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition text-sm font-medium"
            >
              Cancel
            </button>

          </form>

        </div>

    </div>
  );
};

export default AdminForgotPassword;