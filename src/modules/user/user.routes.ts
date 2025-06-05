import { Router } from "express";
import * as controller from "./user.controller";
import { authenticateJWT } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.registerUser);
router.put("/", controller.updateUser);

router.post("/login", controller.loginUser);
router.get("/profile", authenticateJWT, controller.getProfile);

export default router;
