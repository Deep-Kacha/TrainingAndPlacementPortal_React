import React from "react";
import Footer from "../../components/common/Footer";
import AuthHeader from "../../components/common/AuthHeader";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">

    <AuthHeader/>

      {/* Main Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            RK University <br /> Training & Placement Cell
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-[#d8cfc2] p-8 rounded-xl shadow-lg w-full max-w-md">

          <h2 className="text-xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Sign in to access your account
          </p>

          {/* Select Role */}
          <div className="mb-4">
            <label className="text-sm font-medium">Select Role</label>
            <select className="w-full mt-1 p-2 rounded-md border">
              <option>Choose your role</option>
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your college email"
              className="w-full mt-1 p-2 rounded-md border"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 rounded-md border"
            />
          </div>

          <div className="text-right text-sm mb-4">
            <span  onClick={() => navigate("/forgot-password")} className="hover:underline cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Login
          </button>

          <div className="text-center mt-6 text-sm">
            <p>
              Don't have an account?{" "}
              <span className="font-semibold cursor-pointer hover:underline">
                Register ?
              </span>
            </p>
          </div>

        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Login;