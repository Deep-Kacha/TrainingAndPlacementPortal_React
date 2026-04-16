import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../../utils/auth";

/**
 * PublicRoute Component
 * Prevents authenticated users from accessing public pages (like Login).
 */
const PublicRoute = () => {
    const isAuth = isAuthenticated();
    const role = getUserRole();

    if (isAuth) {
        // Redirect to respective dashboard if already logged in
        if (role === "admin") return <Navigate to="/AdminDashboard" replace />;
        if (role === "student") return <Navigate to="/StudDashboard" replace />;
        if (role === "company") return <Navigate to="/CompanyDashboard" replace />;
    }

    // Not authenticated, allow access to public page
    return <Outlet />;
};

export default PublicRoute;
