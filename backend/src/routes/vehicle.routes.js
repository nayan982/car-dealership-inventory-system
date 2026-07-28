import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createVehicle, deleteVehicle, getVehicles, purchaseVehicle, searchVehicles, updateVehicle } from "../controllers/vehicle.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicles);
router.post("/:id/purchase", authMiddleware, purchaseVehicle);
router.put("/:id", authMiddleware, adminMiddleware, updateVehicle);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicle);

export default router;