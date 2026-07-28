import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createVehicle);

export default router;