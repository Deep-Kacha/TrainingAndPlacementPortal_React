import { useState } from "react";
import {FaThLarge,FaUser,FaBuilding,FaUsers,FaCalendarAlt,FaHistory,FaLock,FaSignOutAlt, FaBars, FaTimes} from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FaThLarge /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Company Management", icon: <FaBuilding /> },
    { name: "Student Management", icon: <FaUsers /> },
    { name: "Interview Schedule", icon: <FaCalendarAlt /> },
    { name: "Placement History", icon: <FaHistory /> },
    { name: "Change Password", icon: <FaLock /> },
    { name: "Logout", icon: <FaSignOutAlt /> }
  ];

  return (
    <div className="w-full md:w-64 md:min-h-screen bg-[#d8cfc3] p-5">

      <div className="flex justify-between items-center md:justify-center md:flex-col mb-4">
        <img src={logo} alt="RK University" className="w-28 md:w-36 md:mb-4" />
        <button 
          className="text-2xl md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={`space-y-3 ${isOpen ? "block" : "hidden"} md:block`}>

        {menu.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            {item.icon}
            {item.name}
          </li>
        ))}

      </ul>

    </div>
  );
};

export default Sidebar;