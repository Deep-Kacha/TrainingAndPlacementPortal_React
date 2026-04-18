import React from 'react';

const AdminLayout = ({ children }) => {
    return (
        // Enforces consistent background, text colors, and font defaults
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-200">
            {/* 
                This class "admin-content-wrapper" enforces child elements 
                (like inputs, tables, cards) to naturally adopt consistent styles 
                if they lack specific Tailwind overrides. 
            */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 [&_input]:rounded-md [&_input]:border-gray-300 [&_input]:shadow-sm [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_th]:border-b [&_td]:border-b [&_td]:py-3 [&_th]:py-3">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;