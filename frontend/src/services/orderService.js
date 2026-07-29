import api from "./api";

const getMyOrders = async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
};

const getAll = async (params) => {
    const response = await api.get("/orders", {
        params,
    });

    return response.data;
};

const updateStatus = async (id, status) => {
    const response = await api.patch(
        `/orders/${id}/status`,
        { status }
    );

    return response.data;
};

export const orderService = {
    getMyOrders,
    getAll,
    updateStatus,
};