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
          setTimeout(() => navigate("/login"), 3000);
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
    <div className="w-full">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Recover Admin Account
        </h1>

        <p className="text-gray-600 mb-8">
          Enter your admin email and new password to regain access.
        </p>

        {/* Toast */}
        {toast.visible && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border shadow-sm transition-all animate-in fade-in slide-in-from-top-2 ${
            toast.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <span className="text-lg">{toast.type === "success" ? "✓" : "⚠"}</span>
            <p className="text-sm font-semibold">{toast.message}</p>
          </div>
        )}

        {/* Form */}
        <div className="flex justify-center">

          <form onSubmit={handleSubmit} className="bg-[#d8cfc3] p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">

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
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 mt-6 bg-red-600 text-white rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>}
              {loading ? "Resetting..." : "Reset Password"}
            </button>


            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border py-3 rounded-lg hover:bg-gray-50 mt-3"
            >
              Cancel
            </button>

          </form>

        </div>

    </div>
  );
};

export default AdminForgotPassword;