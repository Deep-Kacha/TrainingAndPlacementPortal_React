import { logout } from "../../utils/auth";
import { useEffect } from "react";
const StudLogout = () => {
    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Logging out...</p>
        </div>
    );
};

export default StudLogout;
