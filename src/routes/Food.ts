import { Router } from "express";
import { FoodController } from "../controllers/index";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

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
    FoodController.Create
);

export default routes;