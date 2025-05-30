import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"; // Ensure this path is correct
import { connectDB } from "./config/db.js";
import cors from 'cors'; // Import CORS

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Allow requests from your frontend server
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    credentials: true, // Allow credentials if needed
}));

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
