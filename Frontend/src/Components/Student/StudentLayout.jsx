import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
// import Sidebartemp from "./sidebar_temp";

const StudentLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <Header />
            <main className="p-4 md:p-8 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentLayout;