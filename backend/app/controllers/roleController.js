import { updateRole } from "../models/userModel.js";

export const assignRole = async (req, res) => {
    const { email, role } = req.body;
    if (!email || !role) return res.status(400).send({ message: "Email and role are required" });

    const validRoles = ["Cool Kid", "Cooler Kid", "Coolest Kid"];
    if (!validRoles.includes(role)) return res.status(400).send({ message: "Invalid role" });

    // Only admin can assign roles
    console.log(req.user);
    
    if (req.user.role !== "Admin") {
        return res.status(403).send({ message: "Access denied. Only admins can assign roles." });
    }

    const updated = await updateRole(email, role);
    if (!updated) return res.status(404).send({ message: "User not found" });

    res.send({ message: "Role updated successfully" });
};
