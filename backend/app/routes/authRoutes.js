import express from "express";
import pool from "../models/db.js"; // Adjust the import path for your DB config
import { signup } from "../controllers/authController.js";

const router = express.Router();

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

    res.json({
      token: "sample-token", // Replace with real JWT
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


router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }
  
    try {
      // Verify the token (assuming you are using JWT)
      const decoded = jwt.verify(token, 'asdfghjkl'); // Replace with your secret key
  
      // Fetch user data from the database using email stored in the token
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [decoded.email]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = rows[0];
  
      // Return the user character data, including role
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
  
// Get all users based on role
router.get("/users", async (req, res) => {
  const { role } = req.query;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    let query = "SELECT first_name, last_name, country FROM users";
    const params = [];

    if (role === "Coolest Kid") {
      query = "SELECT first_name, last_name, country, email, role FROM users";
    } else if (role !== "Cooler Kid") {
      return res
        .status(403)
        .json({ error: "You don’t have permission to view other users’ data." });
    }

    const [rows] = await pool.query(query, params);

    res.json({ users: rows });
  } catch (error) {
    console.error("Error in /users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
