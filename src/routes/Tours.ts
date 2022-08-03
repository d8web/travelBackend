import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TourController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get list tours
routes.get(
    "/",
    ensureAuthenticated,
    TourController.AllTours
);

// Add new tour
routes.post(
    "/",
    upload.single("image"),
    TourController.Create
);

export default routes;