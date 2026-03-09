import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import skillCategoryRoutes from "./routes/skillCategoryRoutes.js";

const app = express();

const normalizeOrigin = (origin = "") =>
  origin.trim().replace(/\/+$/, "").toLowerCase();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const allowAllOrigins = allowedOrigins.includes("*");
const allowVercelPreview = process.env.ALLOW_VERCEL_PREVIEW !== "false";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const requestOrigin = normalizeOrigin(origin);
      if (allowAllOrigins) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(requestOrigin)) return callback(null, true);
      if (allowVercelPreview && requestOrigin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skill-categories", skillCategoryRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
