import { Router } from "express";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.use("/auth", authMiddleware, authRoutes);

// Protected routes
router.use("/users", authMiddleware, userRoutes);

export default router;
