import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CompanySidebar from './CompanySidebar';

const CompanyLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'company') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-64 flex-shrink-0">
        <CompanySidebar />
      </div>
      <div className="flex-1 p-4 md:p-8 overflow-x-hidden md:ml-64 relative min-h-screen w-full box-border">
        <div className="max-w-[1600px] mx-auto w-full pb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
