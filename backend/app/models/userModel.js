import pool from "./db.js";

export const createUser = async (user) => {
    const { firstName, lastName, country, email, role } = user;
    const query = `
        INSERT INTO users (first_name, last_name, country, email, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
        const [result] = await pool.execute(query, [firstName, lastName, country, email, role]);
        return result.insertId;
    } catch (error) {
        console.error("Error inserting user:", error.message);
        throw new Error("Database error while creating user");
    }
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    
    try {
        const [rows] = await pool.execute(query, [email]);
        return rows[0];  // Returns the first row if found, otherwise undefined
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw new Error("Database error while fetching user by email");
    }
};

export const getAllUsers = async () => {
    const query = `SELECT first_name, last_name, country, email, role FROM users`;
    
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error("Error getting all users:", error.message);
        throw new Error("Database error while fetching all users");
    }
};


export const getAllUsersForCooler = async () => {
    const query = `SELECT first_name, last_name, country FROM users`;
    
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error("Error getting all users:", error.message);
        throw new Error("Database error while fetching all users");
    }
};

export const updateRole = async (email, role) => {
    const query = `UPDATE users SET role = ? WHERE email = ?`;
    
    try {
        const [result] = await pool.execute(query, [role, email]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating user role:", error.message);
        throw new Error("Database error while updating user role");
    }
};
