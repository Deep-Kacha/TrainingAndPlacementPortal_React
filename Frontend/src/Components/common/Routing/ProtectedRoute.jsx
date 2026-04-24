import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../../utils/auth";

/**
 * ProtectedRoute Component
 * Restricts access based on authentication and roles.
 * 
 * @param {Array} allowedRoles - List of roles permitted to access the route.
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const isAuth = isAuthenticated();
    const role = getUserRole();

    if (!isAuth) {
        // Redirect to login if not authenticated
        return <Navigate to="/Authentication/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to unauthorized if role doesn't match
        return <Navigate to="/unauthorized" replace />;
    }

    // Role matches or no roles required
    return <Outlet />;
};

export default ProtectedRoute;
