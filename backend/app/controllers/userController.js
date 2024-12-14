import { findUserByEmail, getAllUsers } from "../models/userModel.js";

export const getUser = async (req, res) => {
    const email = req.params.email;
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ user });
};

export const getAllUserNamesAndCountries = async (req, res) => {
    const { role } = req.body; // Assuming role is passed in the body for simplicity
    if (role !== "Cooler Kid" && role !== "Coolest Kid") {
        return res.status(403).send({ message: "Access denied" });
    }

    const users = await getAllUsers();
    res.send({ users });
};
