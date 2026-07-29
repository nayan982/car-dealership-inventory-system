import api from "./api";

const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

const login = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

const me = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

export const authService ={
    register,
    login,
    logout,
    me,
};