import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { BusinessController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get all Business
routes.get(
    "/",
    ensureAuthenticated,
    BusinessController.All
);

// Get one business
routes.get(
    "/:id",
    ensureAuthenticated,
    BusinessController.One
);

// Create business
routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
    BusinessController.Create
);

export default routes;