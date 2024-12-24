import { findUserByEmail, getAllUsers, getAllUsersForCooler } from "../models/userModel.js";

export const getUser = async (req, res) => {
    const email = req.params.email;
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ user });
};

export const getAllUsersDetails = async (req, res) => {
    let { role } = req.body;
    if (!role) {
        role = req.user.role;
    }
    
    if (role !== "Coolest Kid" && role !== "Admin") {
        return res.status(403).send({ message: "Access denied" });
    }

    const users = await getAllUsers();
    res.send({ users });
};

export const getAllUserNamesAndCountries = async (req, res) => {
    const { role } = req.body;
    console.log(role);
    
    if (role !== "Cooler Kid") {
        return res.status(403).send({ message: "Access denied" });
    }

    const users = await getAllUsersForCooler();
    res.send({ users });
};