import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.registerUser);
router.put("/", controller.updateUser);

export default router;
