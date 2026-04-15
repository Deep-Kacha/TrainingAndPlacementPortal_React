/**
 * Authentication Utilities
 * Manages token and user session retrieval from localStorage.
 */

export const getAuthToken = () => {
    return localStorage.getItem("token");
};

export const getAuthUser = () => {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
    }
};

export const isAuthenticated = () => {
    return !!getAuthToken() && !!getAuthUser();
};

export const getUserRole = () => {
    const user = getAuthUser();
    // Normalize role to lowercase for comparison
    return user?.role?.toLowerCase() || null;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/Authentication/login";
};
