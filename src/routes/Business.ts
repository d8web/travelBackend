import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { BusinessController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get all Business
routes.get(
    "/business",
    ensureAuthenticated,
    BusinessController.All
);

// Get one business
routes.get(
    "/business/:id",
    ensureAuthenticated,
    BusinessController.One
);

// Create business
routes.post(
    "/business",
    ensureAuthenticated,
    upload.single("image"),
    BusinessController.Create
);

export default routes;