import { Router } from "express";
import * as controller from "./series.controller";

const router = Router();

router.get("/", controller.getSeries);
router.get("/:seriesId", controller.getSeriesById);
router.post("/", controller.createSeries);
router.put("/:seriesId", controller.updateSeries);
router.put("/:seriesId/hosts", controller.updateSeriesHosts);
router.put("/:seriesId/teams", controller.updateSeriesTeams);
router.put("/:seriesId/formats", controller.updateSeriesFormats);
router.delete("/:seriesId", controller.deleteSeries);

export default router;