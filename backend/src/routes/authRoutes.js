import express from "express";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protegida con JWT
router.get("/profile", verifyToken, getProfile);

export default router;
