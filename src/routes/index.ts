import { Router } from "express";
import openRoutes from "./open/open.routes";
import secureRoutes from "./secure/secure.routes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use('/', openRoutes);    // public routes like /auth/login
router.use('/', authMiddleware, secureRoutes);  // protected routes with middleware

export default router;
