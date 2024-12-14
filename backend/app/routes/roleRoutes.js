import express from "express";
import { assignRole } from "../controllers/roleController.js";

const router = express.Router();

router.post("/assign", assignRole);

export default router;
