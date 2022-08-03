import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AgencyController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Add new agency
routes.post(
    "/agency",
    ensureAuthenticated,
    upload.single("image"),
    AgencyController.CreateAgency
);

// Get list agencies
routes.get(
    "/agencies",
    ensureAuthenticated,
    AgencyController.AllAgencies
);

export default routes;