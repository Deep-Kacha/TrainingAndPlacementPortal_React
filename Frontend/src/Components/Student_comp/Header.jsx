import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-sidebar-bg px-[40px] py-[1px] z-[100] flex items-center justify-between relative min-h-[72px]">
            <div className="flex items-center">
                <img src={logo} alt="RK University Logo" className="h-[70px] w-auto inline-block" />
            </div>
            <button
                className="px-[20px] py-[10px] rounded-[5px] bg-[#e7000b] text-white font-bold cursor-pointer absolute right-[50px] top-[20px] border-none"
                onClick={() => navigate("/student/profile")}
            >
                Profile
            </button>
        </header>
    );
};

export default Header;
