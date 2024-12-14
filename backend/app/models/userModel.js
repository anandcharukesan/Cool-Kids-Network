import pool from "./db.js";

export const createUser = async (user) => {
    const { firstName, lastName, country, email, role } = user;
    const query = `
        INSERT INTO users (first_name, last_name, country, email, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [firstName, lastName, country, email, role]);
    return result.insertId;
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
};

export const getAllUsers = async () => {
    const query = `SELECT first_name, last_name, country FROM users`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const updateRole = async (email, role) => {
    const query = `UPDATE users SET role = ? WHERE email = ?`;
    const [result] = await pool.execute(query, [role, email]);
    return result.affectedRows > 0;
};
