import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = async(req, res, next) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);

  if(users.length === 0){
    return res.status(404).json({message: "User not found"});
  }

  if(users[0].role !== "admin"){
    return res.status(403).json({message : "Forbidden"});
  }

  next();
}
