import { NavLink } from "react-router-dom";
import { FaThLarge, FaFileAlt, FaBriefcase, FaCalendarCheck, FaHistory, FaLock, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
    const sidebarItems = [
        { name: "Dashboard", path: "/student/dashboard", icon: <FaThLarge /> },
        { name: "Profile", path: "/student/profile", icon: <FaFileAlt /> },
        { name: "Jobs", path: "/student/jobs", icon: <FaBriefcase /> },
        { name: "My Applications", path: "/student/applications", icon: <FaFileAlt /> },
        { name: "Interview Schedule", path: "/student/interview_schedule", icon: <FaCalendarCheck /> },
        { name: "Placement History", path: "/student/placement_history", icon: <FaHistory /> },
        { name: "Change Password", path: "/student/change_pass", icon: <FaLock /> },
        { name: "Logout", path: "/student/logout", icon: <FaSignOutAlt /> }
    ];
    return (
        <div className="w-[250px] bg-[#ece6da] flex flex-col p-[20px] overflow-y-auto shrink-0 transition-all">
            <nav className="flex flex-col gap-[10px]">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-[15px] py-[12px] rounded-[8px] cursor-pointer transition-colors duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-transparent no-underline text-[#313c4e] ${isActive
                                ? "bg-[#afafaf] shadow-none hover:bg-[#afafaf]"
                                : "bg-[#ffffff] hover:bg-[#f5f5f5]"
                            }`
                        }
                    >
                        {item.icon && <span className="mr-[12px] text-[1.1rem] text-[#313c4e]">{item.icon}</span>}
                        <span className="text-[1.05rem] font-medium text-[#313c4e]">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;