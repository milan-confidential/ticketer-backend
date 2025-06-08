import { Router } from "express";
import userRoutes from "../modules/user/user.routes";
import { registerUser, resetPassword } from "../modules/user/user.controller";
import authRoutes from "../modules/auth/auth.routes";
import teamRoutes from "../modules/cricket/teams/team.routes";
import playerRoutes from "../modules/cricket/players/player.routes";
import seriesRoutes from "../modules/cricket/Series/series.router";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public auth routes
router.use("/auth", authRoutes);

// Public user registration route
router.use("/user/register", registerUser);
router.use("/user/reset-password", resetPassword);

// Protected user routes
router.use("/user", authMiddleware, userRoutes);
router.use("/teams", authMiddleware, teamRoutes);
router.use("/players", authMiddleware, playerRoutes);
router.use("/series", authMiddleware, seriesRoutes);

export default router;
