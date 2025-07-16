import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);                 // Public
router.post("/login", login);                       // Public
router.post("/logout", isAuthenticated, logout);    // Protected ✅

export default router;
