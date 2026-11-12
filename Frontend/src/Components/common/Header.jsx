import React, { useState } from "react";
import { Link } from "react-router-dom";
import PortalLogo from "./PortalLogo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-200 shadow-sm">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3">

        {/* LEFT : LOGO */}
        <div className="flex-shrink-0">
          <PortalLogo className="h-11 sm:h-14" variant="header" />
        </div>

        {/* CENTER : NAVIGATION */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-10 text-gray-800 font-medium">
          <a href="#home" className="hover:text-red-600">Home</a>
          <a href="#placements" className="hover:text-red-600">Placements</a>
          <a href="#recruiters" className="hover:text-red-600">Recruiters</a>
          <Link to="/submitjd" className="hover:text-red-600">Submit JD</Link>
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
          className="md:hidden text-2xl p-1"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col p-4 space-y-3 text-sm font-medium">
            <a href="#home" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-red-600">Home</a>
            <a href="#placements" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-red-600">Placements</a>
            <a href="#recruiters" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-red-600">Recruiters</a>
            <Link to="/submitjd" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-red-600">Submit JD</Link>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-red-600">About Us</a>

            <hr />

            <Link
              to="/Authentication/login"
              onClick={() => setMenuOpen(false)}
              className="border border-red-600 text-red-600 px-4 py-2 rounded text-center"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
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