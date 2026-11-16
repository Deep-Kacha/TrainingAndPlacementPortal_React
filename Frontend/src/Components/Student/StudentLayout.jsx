import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
// import Sidebartemp from "./sidebar_temp";

const StudentLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <Header />
            <main className="p-4 sm:p-6 md:p-8 md:ml-64 min-w-0 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentLayout;