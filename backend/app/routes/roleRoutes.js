import express from "express";
import { assignRole } from "../controllers/roleController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/assign", authenticateToken, assignRole);

export default router;
