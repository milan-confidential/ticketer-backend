import { Router } from "express";
import userRoutes from "../modules/user/user.routes";
import { registerUser, resetPassword } from "../modules/user/user.controller";
import authRoutes from "../modules/auth/auth.routes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public auth routes
router.use("/auth", authRoutes);

// Public user registration route
router.use("/user/register", registerUser);
router.use("/user/reset-password", resetPassword);

// Protected user routes
router.use("/user", authMiddleware, userRoutes);

export default router;
