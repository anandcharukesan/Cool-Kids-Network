import express from "express";
import pool from "../models/db.js";
import { signup } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const router = express.Router();

// Generate a secure JWT secret using crypto
const JWT_SECRET = crypto.randomBytes(32).toString('hex');
console.log('Using JWT_SECRET:', JWT_SECRET); // So you can see it in console when server starts

// Signup endpoint
router.post("/signup", signup);

// Login endpoint
router.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        email: user.email,
        role: user.role 
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      character: {
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
      },
    });
  } catch (error) {
    console.error("Error in /auth/login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Protected route to get user data
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.user.email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    res.json({
      character: {
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Error in /auth/me:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route to get all users based on role
router.get("/users", authenticateToken, async (req, res) => {
  const userRole = req.user.role;

  try {
    let query = "SELECT first_name, last_name, country FROM users";
    const params = [];

    if (userRole === "Coolest Kid") {
      query = "SELECT first_name, last_name, country, email, role FROM users";
    } else if (userRole !== "Cooler Kid") {
      return res
        .status(403)
        .json({ error: "You don't have permission to view other users' data." });
    }

    const [rows] = await pool.query(query, params);
    res.json({ users: rows });
  } catch (error) {
    console.error("Error in /users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;