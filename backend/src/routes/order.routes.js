import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/order.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;