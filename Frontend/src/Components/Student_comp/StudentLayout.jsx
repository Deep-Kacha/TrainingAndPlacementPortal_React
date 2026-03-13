import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
// import Sidebartemp from "./sidebar_temp";

const StudentLayout = () => {
    return (
        <div className="flex flex-col h-screen font-sans bg-white text-gray-800">
            <Header />
            <div className="flex flex-1 overflow-hidden w-full">
                <Sidebar />
                <main className="flex-1 p-[40px] bg-white overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;