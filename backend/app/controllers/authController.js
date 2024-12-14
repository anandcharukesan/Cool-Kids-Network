import fetch from "node-fetch";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const signup = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });

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
            role: "Cool Kid",
        };
        
        const userId = await createUser(user);
        res.status(201).send({ message: "User created successfully", userId });
    } catch (error) {
        res.status(500).send({ message: "Error creating user", error });
    }
};
