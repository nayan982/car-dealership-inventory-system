import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createVehicle, getVehicles } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createVehicle);
router.get("/", authMiddleware, getVehicles);

export default router;