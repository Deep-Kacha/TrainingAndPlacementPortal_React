import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import {
  FaThLarge,
  FaUser,
  FaBuilding,
  FaUsers,
  FaTasks,
  FaCalendarAlt,
  FaHistory,
  FaLock,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

import PortalLogo from "../common/PortalLogo";

// Map of sidebar item path → all sub-paths that should keep it active
const ADMIN_SUBPAGE_MAP = {
  "/AdminCompanyManagement": ["/AdminJdDetail"],
  "/AdminInterviewSchedule": ["/AdminInterviewScheduleForm"],
  "/AdminChangePassword":    ["/AdminForgotPassword"],
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();

  const menu = [
    { name: "Dashboard",            path: "/AdminDashboard",           icon: <FaThLarge /> },
    { name: "Profile",              path: "/AdminProfile",             icon: <FaUser /> },
    { name: "Company Management",   path: "/AdminCompanyManagement",   icon: <FaBuilding /> },
    { name: "Student Management",   path: "/AdminStudentsManagement",  icon: <FaUsers /> },
    { name: "Manage Applications",  path: "/AdminManageApplications",  icon: <FaTasks /> },
    { name: "Interview Schedule",   path: "/AdminInterviewSchedule",   icon: <FaCalendarAlt /> },
    { name: "Placement History",    path: "/AdminPlacementHistory",    icon: <FaHistory /> },
    { name: "Change Password",      path: "/AdminChangePassword",      icon: <FaLock /> },
  ];

  const isItemActive = (itemPath, reactRouterIsActive) => {
    if (reactRouterIsActive) return true;
    const subpages = ADMIN_SUBPAGE_MAP[itemPath] || [];
    return subpages.includes(location.pathname);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-[#d8cfc3] p-5 z-50 md:overflow-y-auto transition-all [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${
        isOpen ? "h-screen fixed top-0 left-0 overflow-y-auto" : "sticky top-0"
      }`}
    >
      {/* Logo + Mobile Toggle */}
      <div className="flex justify-between items-center md:justify-center md:flex-col">
        <PortalLogo className="w-28 md:w-36 md:mb-4" />
        <button className="text-2xl md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu */}
      <ul className={`space-y-3 ${isOpen ? "block mt-4" : "hidden"} md:block md:mt-0`}>
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end={item.path === "/AdminDashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                const active = isItemActive(item.path, isActive);
                return `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition font-medium text-sm ${
                  active
                    ? "bg-gray-500 text-white shadow-md"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`;
              }}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}

        {/* Logout Button — clears token before navigating */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition font-medium text-sm w-full bg-white text-gray-800 hover:bg-red-50 hover:text-red-600"
          >
            <span className="text-base"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
