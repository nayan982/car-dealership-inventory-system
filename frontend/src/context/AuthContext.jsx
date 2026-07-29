import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const loadSession = async () => {
        try {
            const response = await authService.me();
            setUser(response.user);
        } catch {
            setUser(null);
        } finally {
            setInitializing(false);
        }
    };

    useEffect(() => {
        loadSession();
    }, []);

    const login = async (userData) => {
        const response = await authService.login(userData);
        setUser(response.user);
        return response;
    };

    const register = async (userData) => {
        return await authService.register(userData);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                initializing,
                isAdmin: user?.role === "admin",
                login,
                register,
                logout,
                refresh: loadSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};