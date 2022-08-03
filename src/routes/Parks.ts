import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ParkController } from "../controllers";
import upload from "../helpers/multer";
import { Router } from "express";

const routes = Router();

// List of parks
routes.get(
    "/parks",
    ensureAuthenticated,
    ParkController.AllParks
);

// Create new park
routes.post(
    "/park",
    ensureAuthenticated,
    upload.single("image"),
    ParkController.Create
);

export default routes;