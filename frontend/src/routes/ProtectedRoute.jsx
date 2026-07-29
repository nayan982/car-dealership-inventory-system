import { Navigate, Outlet, useLocation } from "react-router-dom";

import RevLoader from "../components/common/RevLoader";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { user, initializing } = useAuth();
    const location = useLocation();

    if (initializing) {
        return <RevLoader label="Checking session" />;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;