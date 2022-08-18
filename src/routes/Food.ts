import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FoodController } from "../controllers/index";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Get all foods
routes.get(
    "/",
    ensureAuthenticated,
    FoodController.All
);

// Get one food
routes.get(
    "/:id",
    ensureAuthenticated,
    FoodController.One
);

// Create new food
routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
    FoodController.Create
);

export default routes;