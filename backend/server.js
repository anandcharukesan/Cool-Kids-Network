import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./app/routes/authRoutes.js";
import userRoutes from "./app/routes/userRoutes.js";
import roleRoutes from "./app/routes/roleRoutes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
