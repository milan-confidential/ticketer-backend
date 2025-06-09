import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/", controller.getUsers);
router.put("/", controller.updateUser);
router.get("/me", controller.getProfile);
router.put("/change-password", controller.changePassword);

export default router;
