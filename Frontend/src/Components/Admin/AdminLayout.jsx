import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="p-4 md:p-8 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;