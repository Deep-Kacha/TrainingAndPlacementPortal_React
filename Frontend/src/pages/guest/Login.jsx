import React, { useState } from "react";
import Footer from "../../components/common/Footer";
import AuthHeader from "../../components/common/AuthHeader";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const validate = (name, value) => {
        let errorMessage = "";
        if (name === "role" && !value) {
            errorMessage = "Please select a role.";
        } else if (name === "email") {
            if (!value) {
                errorMessage = "Email is required.";
            } else if (role === "Student" && !/^[^\s@]+@rku\.ac\.in$/.test(value)) {
                // Only students must use the @rku.ac.in domain
                errorMessage = "Students must use their @rku.ac.in college email.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = "Please enter a valid email address.";
            }
        } else if (name === "password" && !value) {
            errorMessage = "Password is required.";
        }
        return errorMessage;
    };

    const handleLogin = async () => {
        const roleErr = validate("role", role);
        const emailErr = validate("email", email);
        const passErr = validate("password", password);

        if (roleErr || emailErr || passErr) {
            setValidationErrors({ role: roleErr, email: emailErr, password: passErr });
            return;
        }

        setError(""); // Clear previous errors
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.role === 'student') navigate("/StudDashboard");
                else if (data.user.role === 'admin') navigate("/AdminDashboard");
                else if (data.user.role === 'company') navigate("/CompanyDashboard");
            } else {
                setError(data.error || "Login failed.");
            }
        } catch (err) {
            setError("Network error. Please try again later.");
        }
    };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">

    <AuthHeader/>

      {/* Main Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            RK University <br /> Training & Placement Cell
          </h1>
        </div>

        {/* Login Card */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleLogin(); }} 
          className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md"
        >

          <h2 className="text-xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Sign in to access your account
          </p>

          {/* Select Role */}
          <div className="mb-4">
            <label className="text-sm font-medium">Select Role</label>
            <select 
              className={`w-full mt-1 p-2 rounded-md border ${validationErrors.role ? "border-red-500" : ""}`}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setValidationErrors(prev => ({ ...prev, role: validate("role", e.target.value) }));
              }}
            >
              <option value="">Choose your role</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
            {validationErrors.role && <p className="text-red-500 text-xs mt-1">{validationErrors.role}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your college email"
              className={`w-full mt-1 p-2 rounded-md border ${validationErrors.email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors(prev => ({ ...prev, email: validate("email", e.target.value) }));
              }}
            />
            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full p-2 rounded-md border ${validationErrors.password ? "border-red-500" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidationErrors(prev => ({ ...prev, password: validate("password", e.target.value) }));
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="text-right text-sm mb-4">
            <span
              onClick={() => {
                if (role === "Admin") navigate("/AdminForgotPassword");
                else navigate("/StudForgotPassword");
              }}
              className="hover:underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-3"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full border border-black py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <div className="text-center mt-6 text-sm">
            <p>
              Don't have an account?{" "}
              <span className="font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/Register")}
              >
                Register ?
              </span>
            </p>
          </div>

        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default Login;