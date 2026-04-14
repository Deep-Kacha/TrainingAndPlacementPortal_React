import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddPortalUser = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    const newErrors = { ...errors };
    if (name === "email") {
      if (!value) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = "Invalid email";
      else delete newErrors.email;
    } else if (name === "password") {
      if (!value) newErrors.password = "Password is required";
      else if (value.length < 6) newErrors.password = "Min 6 chars required";
      else delete newErrors.password;
    } else if (name === "confirmPassword") {
      if (value !== newForm.password) newErrors.confirmPassword = "Passwords do not match";
      else delete newErrors.confirmPassword;
    }
    setErrors(newErrors);
  };

  const handleAddUser = async () => {
    // Force validation
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setCreatedUser(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const result = await res.json();
      if (result.success) {
        setCreatedUser(result.data);
        setForm({ email: "", password: "", confirmPassword: "" });
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Network Error while adding user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm h-full flex flex-col">

      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6">
        Add Another Portal User
      </h2>

      <div className="space-y-5 flex-grow">

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Enter Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter verified email"
            className="w-full rounded-md p-2.5 outline-none transition-all bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Enter Password</label>
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPass ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-md p-2.5 outline-none transition-all bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              className="w-full rounded-md p-2.5 outline-none transition-all bg-white border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>}
        </div>

      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={handleAddUser}
          disabled={loading}
          className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium shadow transition-colors disabled:bg-red-400"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
        <button 
          onClick={() => { setForm({email: "", password: "", confirmPassword: ""}); setErrors({}); }}
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-colors"
        >
          Cancel
        </button>
      </div>

      {createdUser && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-bold text-green-800 mb-2">Successfully Created!</h3>
          <p className="text-sm text-gray-700"><span className="font-semibold">Email:</span> {createdUser.email}</p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Password:</span> {createdUser.password}</p>
          <p className="text-xs text-gray-500 mt-2 italic">Copy these credentials safely. The password will not be shown again.</p>
        </div>
      )}

    </div>
  );
};

export default AddPortalUser;