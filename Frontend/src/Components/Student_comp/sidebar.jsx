import { NavLink } from "react-router-dom";
// import { sidebarItems } from "./sidebarConfig";

const Sidebar = () => {
    const sidebarItems = [
        { name: "Dashboard", path: "/student/dashboard", },
        { name: "Profile", path: "/student/profile", },
        { name: "Jobs", path: "/student/jobs", },
        { name: "Applications", path: "/student/applications", },
        { name: "Interview Schedule", path: "/student/interview_schedule", },
        { name: "Placement History", path: "/student/placement_history", },
        { name: "Change Password", path: "/student/change_pass", },
        { name: "Logout", path: "/student/logout", }
    ];
    return (
        <div className="w-[210px] bg-[#ece6da] flex flex-col p-[20px] overflow-y-auto shrink-0 transition-all">
            <nav className="flex flex-col gap-[10px]">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-[15px] py-[12px] rounded-[8px] cursor-pointer transition-colors duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-transparent no-underline text-[#333333] ${isActive
                                ? "bg-[#bababa] text-[#333] shadow-none hover:bg-[#bababa]"
                                : "bg-[#ffffff] hover:bg-[#f5f5f5]"
                            }`
                        }
                    >
                        {/* <span className="mr-3 text-[1.2rem]">{item.icon}</span> */}
                        <span className="text-[0.95rem] font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;