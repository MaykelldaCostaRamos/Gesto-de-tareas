import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";

const router = express.Router();

// Endpoint de registro
router.post("/register", registerUser);

// Endpoint de login 
router.post("/login", loginUser);

// Endpoint de Usuario Autenticado
router.post("/profile", getProfile);

export default router;
