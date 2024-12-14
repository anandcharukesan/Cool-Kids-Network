import mysql from "mysql2/promise";

// Create connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "coolkids",
});

export default pool;
