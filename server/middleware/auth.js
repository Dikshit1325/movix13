import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ message: "Your session is no longer valid. Please sign in again." });
  }
}
