import express from "express";
import { getUser, getAllUserNamesAndCountries } from "../controllers/userController.js";

const router = express.Router();

router.get("/:email", getUser);
router.post("/all", getAllUserNamesAndCountries);

export default router;
