import express from "express";
import {
  getSkillCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory
} from "../controllers/skillCategoryController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkillCategories);

router.post("/create", verifyToken, isAdmin, createSkillCategory);

router.put("/:id", verifyToken, isAdmin, updateSkillCategory);

router.delete("/:id", verifyToken, isAdmin, deleteSkillCategory);

export default router;