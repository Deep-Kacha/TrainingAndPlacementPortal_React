import { useState } from "react";

const AddPortalUser = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

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

  return (
    <div className="bg-[#d8cfc3] rounded-xl p-6 md:p-8 shadow-sm">

      <h2 className="text-center font-semibold mb-6">
        Add Another Person To Access A Portal
      </h2>

      <div className="space-y-4">

        <div>
          <label className="text-sm">Enter Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter college verified email"
            className="w-full mt-1 p-2 rounded-md bg-white border border-gray-400"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm">Enter Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter new password"
            className="w-full mt-1 p-2 rounded-md bg-white border border-gray-400"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm">Confirm Password</label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Re-enter new password"
            className="w-full mt-1 p-2 rounded-md bg-white border border-gray-400"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
          Add
        </button>

        <button className="w-full border border-gray-400 py-3 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
          Cancel
        </button>

      </div>

    </div>
  );
};

export default AddPortalUser;