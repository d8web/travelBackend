import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserController } from "../controllers";
import { Router } from "express";

const routes = Router();

// Toggle follow route
routes.post(
    "/user/:id/follow",
    ensureAuthenticated,
    UserController.Follow
);

// Get followers from user, param userId inside at the query params
routes.get(
    "/user/:id/followers",
    ensureAuthenticated,
    UserController.Followers
);

// Toogle a favorite user
routes.post(
    "/user/favorite",
    ensureAuthenticated,
    UserController.ToogleFavorite
);

// Get a list of favorites from user
routes.get(
    "/user/favorites",
    ensureAuthenticated,
    UserController.AllFavorites
);

export default routes;