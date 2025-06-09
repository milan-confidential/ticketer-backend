import { Router } from "express";
import * as controller from "./country.controller";

const router = Router();

router.get("/", controller.getCountries);
router.get("/:countryId", controller.getCountryById);
router.post("/", controller.createCountry);
router.put("/:countryId", controller.updateCountry);
router.delete("/:countryId", controller.deleteCountry);

export default router;
