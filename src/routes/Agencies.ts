import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AgencyController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get list agencies
routes.get(
    "/",
    ensureAuthenticated,
    AgencyController.AllAgencies
);

// Add new agency
routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
    AgencyController.CreateAgency
);

export default routes;