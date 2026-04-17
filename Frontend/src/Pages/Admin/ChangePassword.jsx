import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminChangePassword = () => {

  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, message: "", ok: true });

  const showToast = (message, ok = true) => {
    setToast({ visible: true, message, ok });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  };

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const validateField = (name, value, allData) => {
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
      else if (value !== allData.new) error = "Passwords do not match.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const error = validateField(name, value, updatedData);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "new" && updatedData.confirm) {
      const confirmError = validateField("confirm", updatedData.confirm, updatedData);
      setErrors((prev) => ({ ...prev, [name]: error, confirm: confirmError }));
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
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/change-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: formData.current,
            newPassword: formData.new
          })
        });

        const result = await res.json();
        if (result.success) {
          showToast("Password updated successfully!", true);
          setFormData({ current: "", new: "", confirm: "" });
        } else {
          showToast(result.error || "Failed to update password.", false);
        }
      } catch {
        showToast("Network error. Please check your connection.", false);
      }
    }
  };




  return (

    <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Admin Security Settings
        </h1>
        <p className="text-gray-600 mb-8">
          Update your management account password for enhanced security.
        </p>

        {/* Form Container */}
        <div className="flex justify-center">

          <form onSubmit={handleSubmit} className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

            <h2 className="text-xl font-bold text-center mb-2">
              Change Secret Key
            </h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Update your entrance credentials
            </p>

            {/* Toast */}
            {toast.visible && (
              <div className={`mb-6 p-3 rounded-md text-sm font-medium border ${
                toast.ok ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                {toast.message}
              </div>
            )}

            {/* Current Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative mt-1">
                <input
                  type={showCurrent ? "text" : "password"}
                  name="current"
                  value={formData.current}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className={`w-full p-2 rounded-md border ${errors.current ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative mt-1">
                <input
                  type={showNew ? "text" : "password"}
                  name="new"
                  value={formData.new}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`w-full p-2 rounded-md border ${errors.new ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">Confirm New Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className={`w-full p-2 rounded-md border ${errors.confirm ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>



            {/* Forgot Password Link */}
            <div className="text-right text-sm mb-4">
              <button
                type="button"
                className="text-gray-700 hover:underline"
                onClick={() => navigate("/AdminForgotPassword")}
              >
                Forgot Password?
              </button>
            </div>

            {/* Update Button */}
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md mb-3 hover:bg-red-700 font-semibold shadow-sm">
              Update Password
            </button>

            <button 
              type="button"
              className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition text-sm font-medium"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

          </form>

        </div>

    </div>
  );
};

export default AdminChangePassword;