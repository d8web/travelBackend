import { AccommodationController } from "../controllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get all accommodations
routes.get(
    "/",
    ensureAuthenticated,
    AccommodationController.AllAccomodations
);

// Add new accommodation
routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
    AccommodationController.Create
);

// Get one accommodation
routes.get(
    "/:id",
    ensureAuthenticated,
    AccommodationController.GetOneAcommodation
);

export default routes;