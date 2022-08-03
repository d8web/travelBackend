import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserController } from "../controllers";
import { Router } from "express";

const routes = Router();

// Toggle follow route
routes.post(
    "/:id/follow",
    ensureAuthenticated,
    UserController.Follow
);

// Get followers from user, param userId inside at the query params
routes.get(
    "/:id/followers",
    ensureAuthenticated,
    UserController.Followers
);

// Toogle a favorite user
routes.post(
    "/favorite",
    ensureAuthenticated,
    UserController.ToogleFavorite
);

// Get a list of favorites from user
routes.get(
    "/favorites",
    ensureAuthenticated,
    UserController.AllFavorites
);

export default routes;