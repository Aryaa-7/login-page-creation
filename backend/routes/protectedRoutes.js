import express from "express";
import { Router } from "express";
import { isAuthenticated, isAdmin, isUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/protected", isAuthenticated, (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
});

router.get("/admin", isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: "Admin route accessed successfully" });
});

router.get("/user", isAuthenticated, isUser, (req, res) => {
    res.json({ message: "User route accessed successfully" });
});

export default router;