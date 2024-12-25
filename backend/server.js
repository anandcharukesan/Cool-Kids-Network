import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./app/routes/authRoutes.js";
import userRoutes from "./app/routes/userRoutes.js";
import roleRoutes from "./app/routes/roleRoutes.js";
import meRoutes from "./app/routes/meroutes.js";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/me", meRoutes);  // Corrected route for /me endpoint

// CORS configuration
app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
);
app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
