import { Router } from "express";
import * as controller from "./series.controller";

const router = Router();

router.get("/", controller.getSeries);
router.get("/:id", controller.getSeriesById);
router.post("/", controller.createSeries);
router.put("/:id", controller.updateSeries);
router.delete("/:id", controller.deleteSeries);

export default router;