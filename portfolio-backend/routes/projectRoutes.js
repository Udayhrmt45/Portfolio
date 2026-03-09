import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import {getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.post(
    "/create",
    verifyToken,
    isAdmin,
    upload.single("image"),
    createProject
  );

router.put(
    "/:id",
    verifyToken,
    isAdmin,
    upload.single("image"),
    updateProject
  );

router.delete("/:id", verifyToken, isAdmin, deleteProject);

export default router;


