import { JWT_SECRET } from "../config/config.js"; // Import the secret
import {createUser, findUserByEmail } from "../models/userModel.js"; // Ensure this line is present
import pool from "../models/db.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });

    // Check if email already exists in the users table
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).send({ message: "Email already registered" });

    try {
        const randomUserResponse = await fetch("https://randomuser.me/api/");
        const randomUserData = await randomUserResponse.json();
        const { name, location } = randomUserData.results[0];
        
        const user = {
            firstName: name.first,
            lastName: name.last,
            country: location.country,
            email,
            role: "Cool Kid",  // default role for signup
        };
        
        const userId = await createUser(user);
        res.status(201).send({ message: "User created successfully", userId });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Error creating user", error: error.message });
    }
};
export const login = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Check if the email is in the users table or admin table
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        const [adminRows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);

        let user = rows[0];
        if (adminRows.length > 0) {
            // If the email is found in the admin table
            user = adminRows[0];
            user.role = "Admin"; // Set the role to Admin
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, role: user.role },
            JWT_SECRET
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
};
