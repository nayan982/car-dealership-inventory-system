import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import Order from "../models/Order.js";

export const getDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalVehicles = await Vehicle.countDocuments();

        const totalOrders = await Order.countDocuments();

        const pendingOrders =
            await Order.countDocuments({
                status: "Pending",
            });

        const lowStockVehicles =
            await Vehicle.countDocuments({
                quantity: { $lte: 5 },
            });

        const deliveredOrders =
            await Order.find({
                status: "Delivered",
            });

        const totalRevenue =
            deliveredOrders.reduce(
                (sum, order) => sum + order.totalPrice,
                0
            );

        return res.status(200).json({

            totalUsers,

            totalVehicles,

            totalOrders,

            pendingOrders,

            lowStockVehicles,

            totalRevenue,

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};