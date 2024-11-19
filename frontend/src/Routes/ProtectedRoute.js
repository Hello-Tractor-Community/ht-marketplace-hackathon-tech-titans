import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
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
