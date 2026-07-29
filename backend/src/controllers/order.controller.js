import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    })
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("vehicle")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

export const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
};