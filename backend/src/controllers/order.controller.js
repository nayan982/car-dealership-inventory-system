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

    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
};