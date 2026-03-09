import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-200 shadow-sm">
      <div className="w-full flex items-center justify-between px-6 py-3">

        {/* LEFT : LOGO */}
        <div className="flex-shrink-0">
          <img src={logo} alt="RK University" className="h-14" />
        </div>

        {/* CENTER : NAVIGATION */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10 text-gray-800 font-medium">
          <a href="#home" className="hover:text-red-600">Home</a>
          <a href="#placements" className="hover:text-red-600">Placements</a>
          <a href="#recruiters" className="hover:text-red-600">Recruiters</a>
          <a href="/submit-jd" className="hover:text-red-600">Submit JD</a>
          <a href="#about" className="hover:text-red-600">About Us</a>
        </nav>

        {/* RIGHT : AUTH BUTTONS */}
        <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
          <Link
            to="/Authentication/login"
            className="px-4 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Register
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/">Home</Link>
            <Link to="/placements">Placements</Link>
            <Link to="/recruiters">Recruiters</Link>
            <Link to="/submit-jd">Submit JD</Link>
            <Link to="/about">About Us</Link>

            <hr />

            <Link
              to="/login"
              className="border border-red-600 text-red-600 px-4 py-2 rounded text-center"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-red-600 text-white px-4 py-2 rounded text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;