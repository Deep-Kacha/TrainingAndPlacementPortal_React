import React, { useState } from "react";
import Footer from "../../Components/common/Footer";
import AuthHeader from "../../Components/common/AuthHeader";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCheck, FaShieldAlt } from "react-icons/fa";
import { DEMO_ACCOUNTS, IS_DEMO_MODE, PORTAL_BRANDING } from "../../demo/demoConfig";


const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [demoLoadingKey, setDemoLoadingKey] = useState(null);

  const validate = (name, value, targetRole = role) => {
    let errorMessage = "";
    if (name === "role" && !value) {
      errorMessage = "Please select a role.";
    } else if (name === "email") {
      if (!value) {
        errorMessage = "Email is required.";
      } else if (targetRole === "Student" && !value.toLowerCase().endsWith(`@${PORTAL_BRANDING.emailDomain}`)) {
        errorMessage = `Students must use their @${PORTAL_BRANDING.emailDomain} college email.`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    } else if (name === "password" && !value) {
      errorMessage = "Password is required.";
    }
    return errorMessage;
  };

  const performLogin = async (loginRole, loginEmail, loginPassword) => {
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword, role: loginRole })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role === "student") navigate("/StudDashboard");
        else if (data.user.role === "admin") navigate("/AdminDashboard");
        else if (data.user.role === "company") navigate("/CompanyDashboard");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again later.");
    }
  };

  const handleLogin = async () => {
    const roleErr = validate("role", role, role);
    const emailErr = validate("email", email, role);
    const passErr = validate("password", password, role);

    if (roleErr || emailErr || passErr) {
      setValidationErrors({ role: roleErr, email: emailErr, password: passErr });
      return;
    }

    await performLogin(role, email, password);
  };

  const handleDemoQuickLogin = async (account) => {
    setRole(account.role);
    setEmail(account.email);
    setPassword(account.password);
    setValidationErrors({});
    setDemoLoadingKey(account.key);
    try {
      await performLogin(account.role, account.email, account.password);
    } finally {
      setDemoLoadingKey(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">

      <AuthHeader />

      {/* Main Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {PORTAL_BRANDING.institutionName} <br /> Training &amp; Placement Cell
          </h1>
        </div>

        <div className={`w-full flex flex-col items-center justify-center gap-6 ${IS_DEMO_MODE ? "max-w-5xl lg:flex-row lg:items-start" : "max-w-md"}`}>
          {/* Login Card */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className="bg-[#d8cfc2] p-5 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
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
                  const nextRole = e.target.value;
                  setRole(nextRole);
                  setValidationErrors(prev => ({
                    ...prev,
                    role: validate("role", nextRole, nextRole),
                    email: email ? validate("email", email, nextRole) : prev.email
                  }));
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
                placeholder={role === "Student" ? `student@${PORTAL_BRANDING.emailDomain}` : "Enter your college email"}
                className={`w-full mt-1 p-2 rounded-md border ${validationErrors.email ? "border-red-500" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationErrors(prev => ({ ...prev, email: validate("email", e.target.value, role) }));
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
                    setValidationErrors(prev => ({ ...prev, password: validate("password", e.target.value, role) }));
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
                onClick={() => navigate("/ForgotPassword")}
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

          {/* Role-Based Demo Access Card (Shown only in Demo/Production Mode) */}
          {IS_DEMO_MODE && (
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-red-600" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Role-Based Demo Access
                  </h2>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full">
                  Seed Data
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Explore every role with preloaded Indian campus seed data. Changes made
                (add, edit, delete, apply, approve) work live in your session and
                automatically restore back to defaults when you log out.
              </p>

              <div className="space-y-2.5">
                {DEMO_ACCOUNTS.map((account) => (
                  <div
                    key={account.key}
                    className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-red-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">
                          {account.label}
                        </span>
                        <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {account.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 truncate mt-0.5">
                        {account.email} &middot; Pass: <span className="font-mono font-semibold">{account.password}</span>
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {account.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={demoLoadingKey === account.key}
                      onClick={() => handleDemoQuickLogin(account)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-md transition cursor-pointer disabled:opacity-60"
                    >
                      <FaUserCheck />
                      {demoLoadingKey === account.key ? "Signing in..." : "Demo Login"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;