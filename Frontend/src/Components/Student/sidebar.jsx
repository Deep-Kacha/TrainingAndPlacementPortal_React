import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    FaThLarge,
    FaUser,
    FaFileAlt,
    FaBriefcase,
    FaCalendarCheck,
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

    const sidebarItems = [
        { name: "Dashboard", path: "/StudDashboard", icon: <FaThLarge /> },
        { name: "Profile", path: "/StudProfile", icon: <FaUser /> },
        { name: "Jobs", path: "/StudJobs", icon: <FaBriefcase /> },
        { name: "My Applications", path: "/StudApplications", icon: <FaFileAlt /> },
        { name: "Interview Schedule", path: "/StudInterviewSchedule", icon: <FaCalendarCheck /> },
        { name: "Placement History", path: "/StudPlacementHistory", icon: <FaHistory /> },
        { name: "Change Password", path: "/StudChangePass", icon: <FaLock /> },
        { name: "Logout", path: "/", icon: <FaSignOutAlt /> }
    ];

    return (
        <div className={`w-full md:w-64 md:h-screen md:fixed md:left-0 md:top-0 bg-[#d8cfc3] p-5 z-50 md:overflow-y-auto transition-all [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${isOpen ? "h-screen fixed top-0 left-0 overflow-y-auto" : "sticky top-0"}`}>
            
            {/* Logo + Mobile Button */}
            <div className="flex justify-between items-center md:justify-center md:flex-col">
                <img src={logo} alt="RK University" className="w-28 md:w-36 md:mb-4" />
                
                <button
                    className="text-2xl md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Menu */}
            <ul className={`space-y-3 ${isOpen ? "block mt-4" : "hidden"} md:block md:mt-0`}>
                {sidebarItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            end={item.path === "/"}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => {
                                const isLinkActive = isActive ||
                                (item.path === "/StudJobs" && location.pathname === "/StudJobDetails") ||
                                (item.path === "/StudChangePass" && location.pathname === "/StudForgotPassword");
                                return `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition font-medium text-sm ${
                                    isLinkActive
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
            </ul>
        </div>
    );
};

export default Sidebar;