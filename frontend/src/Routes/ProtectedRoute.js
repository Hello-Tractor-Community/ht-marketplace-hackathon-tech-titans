import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Initialize user state with parsed localStorage data to avoid delay
    const userJson = localStorage.getItem("user_data");
    const [user, setUser] = useState(userJson ? JSON.parse(userJson) : null);

    useEffect(() => {
        // Sync state with localStorage in case it changes dynamically
        const userData = userJson ? JSON.parse(userJson) : null;
        setUser(userData);
    }, [userJson]);

    if (!user) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.userType)) {
        // Redirect to "Not Authorized" page if user doesn't have the required role
        return <Navigate to="/not-authorized" />;
    }

    // If user is authenticated and has the required role, render the children
    return children;
};

export default ProtectedRoute;
