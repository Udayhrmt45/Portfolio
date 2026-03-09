import express from "express";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
import { createContact, deleteContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

router.post("/create", createContact);

router.get("/", verifyToken, isAdmin, getContacts);
router.delete("/:id", verifyToken, isAdmin, deleteContact);

export default router;