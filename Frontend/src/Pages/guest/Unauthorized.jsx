import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaHome } from "react-icons/fa";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-[#d8cfc3] p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <FaLock size={40} />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Access Denied</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    You don't have the required permissions to view this page. 
                    Please contact the administrator if you believe this is an error.
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                    >
                        <FaHome /> Go to Homepage
                    </button>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-gray-500 font-bold text-sm uppercase tracking-widest hover:text-black transition-colors py-2"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
            
            <p className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                Protected by RKU Placement Security Layer
            </p>
        </div>
    );
};

export default Unauthorized;
