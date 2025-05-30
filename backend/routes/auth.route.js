import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // This handles POST requests for signup
router.post("/login", login); // This handles POST requests for login
router.post("/logout", logout); // This handles POST requests for logout

export default router;
