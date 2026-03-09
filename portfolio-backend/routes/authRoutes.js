import express from "express";
import { login, logout } from "../controllers/authController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, isAdmin, logout);

export default router;