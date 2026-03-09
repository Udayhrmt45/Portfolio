import express, { Router } from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { getCertifications, createCertification, updateCertification, deleteCertification } from "../controllers/certificationController.js";

const router = express.Router();

router.get("/", getCertifications);

router.post(
    "/create",
    verifyToken,
    isAdmin,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "document", maxCount: 1 }
    ]),
    createCertification
  );
  
  router.put(
    "/:id",
    verifyToken,
    isAdmin,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "document", maxCount: 1 }
    ]),
    updateCertification
  );
router.delete("/:id", verifyToken, isAdmin, deleteCertification);

export default router;
