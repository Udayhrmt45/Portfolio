import { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills } from "../controllers/skillController.js";
import express from "express";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);

router.post("/create",verifyToken, isAdmin, createSkill);
router.put("/reorder", verifyToken, isAdmin, reorderSkills);
router.put("/:id",verifyToken, isAdmin, updateSkill);
router.delete("/:id", verifyToken, isAdmin,deleteSkill);

export default router;