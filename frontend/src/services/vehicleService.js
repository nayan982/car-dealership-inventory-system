import api from "./api";

const getAll = async (params) => {
    const response = await api.get("/vehicles", { params });
    return response.data;
};

const search = async (params) => {
    const response = await api.get("/vehicles/search", { params });
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
};

const create = async (vehicleData) => {
    const response = await api.post("/vehicles", vehicleData);
    return response.data;
};

const update = async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
};

const restock = async (id, quantity) => {
    const response = await api.patch(`/vehicles/${id}/restock`, {
        quantity,
    });

    return response.data;
};

const purchase = async (id, orderData) => {
    const response = await api.post(
        `/vehicles/${id}/purchase`,
        orderData
    );

    return response.data;
};

export const vehicleService = {
    getAll,
    search,
    getById,
    create,
    update,
    remove,
    restock,
    purchase,
};