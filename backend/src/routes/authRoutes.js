import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Endpoint de registro
router.post("/register", registerUser);

// Endpoint de login 
router.post("/login", loginUser);

export default router;
