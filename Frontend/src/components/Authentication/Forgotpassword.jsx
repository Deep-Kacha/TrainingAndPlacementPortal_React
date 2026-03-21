import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../../components/common/Footer";
import AuthHeader from "../common/AuthHeader";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = (name, value) => {

    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@rku\.ac\.in$/.test(value))
        error = "Only @rku.ac.in emails are allowed";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8)
        error = "Password must be at least 8 characters";
    }

    if (name === "confirmPassword") {
      if (value !== form.password)
        error = "Passwords do not match";
    }

    return error;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const err = validate(name, value);

    setErrors({
      ...errors,
      [name]: err
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newErrors = {
      email: validate("email", form.email),
      password: validate("password", form.password),
      confirmPassword: validate("confirmPassword", form.confirmPassword)
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      alert("Password reset successful");
      navigate("/Authentication/login");
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-200">

      <AuthHeader />

      {/* MAIN */}

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            RK University <br /> Training & Placement Cell
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

          <h2 className="text-xl font-bold text-center mb-2">
            Forgot Password
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Reset your account password
          </p>

          {/* EMAIL */}

          <div className="mb-4">
            <label className="text-sm font-medium">Registered Email Address</label>
            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your college email"
                className={`w-full p-2 rounded-md border ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}

          </div>


          {/* PASSWORD */}

          <div className="mb-4">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full p-2 rounded-md border"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="mb-4">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className="w-full p-2 rounded-md border"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}

          </div>


          {/* PASSWORD RULES */}

          <div className="bg-gray-100 rounded-md p-4 mb-6 text-sm">

            <p className="font-medium mb-2">Password must contain:</p>

            <ul className="space-y-1 text-gray-600">
              <li>✔ At least 8 characters</li>
              <li>✔ One uppercase letter</li>
              <li>✔ One lowercase letter</li>
              <li>✔ One number</li>
            </ul>

          </div>


          {/* BUTTONS */}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3"
          >
            Confirm Password
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
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

export default ForgotPassword;