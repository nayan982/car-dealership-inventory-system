import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createVehicle, getVehicles, searchVehicles } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);
router.get("/search", authMiddleware, searchVehicles);

export default router;