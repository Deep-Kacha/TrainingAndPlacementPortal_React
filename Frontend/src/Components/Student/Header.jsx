import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="absolute top-0 right-0 z-40 p-4 md:p-8 hidden md:flex justify-end">
            <button
                className="px-[20px] py-[10px] rounded-[5px] bg-[#e7000b] text-white font-bold cursor-pointer border-none shadow-sm hover:bg-red-700 transition-colors"
                onClick={() => navigate("/StudProfile")}
            >
                Profile
            </button>
        </header>
    );
};

export default Header;
