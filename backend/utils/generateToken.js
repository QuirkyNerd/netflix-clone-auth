// utils/generateToken.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Import dotenv if you're using a .env file

dotenv.config(); // Load .env variables

// Function to generate a token and set it as a cookie
export const generateTokenAndSetCookie = (userId, res) => {
    // Ensure the JWT secret is available
    const jwtSecret = process.env.JWT_SECRET; // Fetch from environment variables

    if (!jwtSecret) {
        throw new Error("JWT secret is not defined in environment variables");
    }

    // Generate the JWT token
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "15d" });

    // Set the cookie with the generated token
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS attacks by making it inaccessible to JavaScript
        sameSite: "strict", // Helps mitigate CSRF attacks
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    return token; // Optionally return the token for further use
};