import { Router } from "express";
import * as controller from "./series.controller";

const router = Router();

router.get("/", controller.getSeries);
router.get("/:id", controller.getSeriesById);
router.post("/", controller.createSeries);
router.put("/:id", controller.updateSeries);
router.put(":id/hosts", controller.updateSeriesHosts);
router.put(":id/teams", controller.updateSeriesTeams);
router.put(":id/formats", controller.updateSeriesFormats);
router.delete("/:id", controller.deleteSeries);

export default router;