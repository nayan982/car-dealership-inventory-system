import { Navigate, Outlet } from "react-router-dom";

import RevLoader from "../components/common/RevLoader";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
    const { user, isAdmin, initializing } = useAuth();

    if (initializing) {
        return <RevLoader label="Checking permissions" />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;