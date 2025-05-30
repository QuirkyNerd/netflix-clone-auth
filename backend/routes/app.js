import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS middleware
import authRoutes from "./routes/auth.route.js"; // Ensure this path is correct
import { connectDB } from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000; // Hardcoded to 5000 as requested

// Connect to the database
connectDB();

// Middleware to enable CORS
app.use(cors()); // Use CORS middleware to allow requests from the frontend

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Welcome to the home page!");
});

// Debug: Output the MongoDB URI to verify if it's being read correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

// Authentication routes
app.use("/api/v1/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});