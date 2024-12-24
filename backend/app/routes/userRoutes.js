import express from "express";
import { getUser, getAllUserNamesAndCountries, getAllUsersDetails } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:email", authenticateToken, getUser);
router.get("/all/maintainer", authenticateToken, getAllUsersDetails);
router.post("/all/coolest", getAllUsersDetails);
router.post("/all/cooler", getAllUserNamesAndCountries);


export default router;
