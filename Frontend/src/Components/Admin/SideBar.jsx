import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaUser,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaHistory,
  FaLock,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/AdminDashboard", icon: <FaThLarge /> },
    { name: "Profile", path: "/AdminProfile", icon: <FaUser /> },
    { name: "Company Management", path: "/AdminCompanyManagement", icon: <FaBuilding /> },
    { name: "Student Management", path: "/AdminStudentsManagement", icon: <FaUsers /> },
    { name: "Interview Schedule", path: "/AdminInterviewSchedule", icon: <FaCalendarAlt /> },
    { name: "Placement History", path: "/AdminPlacementHistory", icon: <FaHistory /> },
    { name: "Change Password", path: "/AdminChangePassword", icon: <FaLock /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> }
  ];

  return (
    <div
      className={`w-full md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-[#d8cfc3] p-5 z-50 md:overflow-y-auto transition-all [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${isOpen ? "h-screen fixed top-0 left-0 overflow-y-auto" : "sticky top-0"}`}
    >

      {/* Logo + Mobile Toggle */}
      <div className="flex justify-between items-center md:justify-center md:flex-col">

        <img
          src={logo}
          alt="RK University"
          className="w-28 md:w-36 md:mb-4"
        />

        <button
          className="text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Menu */}
      <ul
        className={`space-y-3 ${isOpen ? "block mt-4" : "hidden"} md:block md:mt-0`}
      >

        {menu.map((item, index) => (

          <li key={index}>

            <NavLink
              to={item.path}
              end={item.path === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {

                const isCompanyActive =
                  isActive ||
                  (item.path === "/AdminCompanyManagement" &&
                    location.pathname === "/AdminJdDetail") ||
                  (item.path === "/AdminInterviewSchedule" &&
                    location.pathname === "/AdminInterviewScheduleForm") ||
                  (item.path === "/AdminChangePassword" &&
                    location.pathname === "/AdminForgotPassword");

                return `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                ${
                  isCompanyActive
                    ? "bg-[rgb(175,172,172)] text-white"
                    : "bg-white hover:bg-gray-200"
                }`;
              }}
            >

              {item.icon}
              {item.name}

            </NavLink>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default Sidebar;
