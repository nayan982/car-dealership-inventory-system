import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createVehicle, deleteVehicle, getVehicles, getVehiclesDetails, purchaseVehicle, restockVehicle, searchVehicles, updateVehicle } from "../controllers/vehicle.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/search", searchVehicles);
router.get("/", getVehicles);
router.get("/:id", getVehiclesDetails);
router.post("/", authMiddleware, adminMiddleware, createVehicle);
router.post("/:id/purchase", authMiddleware, purchaseVehicle);
router.put("/:id", authMiddleware, adminMiddleware, updateVehicle);
router.patch("/:id/restock", authMiddleware, adminMiddleware, restockVehicle);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicle);

export default router;