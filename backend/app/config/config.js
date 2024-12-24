import crypto from "crypto";

// Generate a secure JWT secret using crypto
export const JWT_SECRET = crypto.randomBytes(32).toString("hex");
