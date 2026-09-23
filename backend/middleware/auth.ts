import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pragati_sih_hackathon_super_secure_jwt_secret_2026";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    phone: string;
    role: "farmer" | "buyer" | "apmc" | "fpo" | "admin";
    name: string;
  };
}

export function generateToken(payload: { id: string; phone: string; role: string; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. Please provide a valid Bearer token.",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired session token. Please log in again.",
    });
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Authentication required." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role(s): ${allowedRoles.join(", ")}. Current role: ${req.user.role}`,
      });
    }
    next();
  };
}
