// meRoutes.js
import express from "express";
import pool from "../models/db.js"; // Assuming you're using MySQL for DB
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define the /me route with authentication middleware
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const { email } = req.user;

    // Query the database for the user based on email
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0]; // Get the first user (you can modify this as needed)
    res.json({ character: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
