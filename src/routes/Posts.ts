import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { PostController } from "../controllers";
import { Router } from "express";

const routes = Router();

// Like and deslike route toogle
routes.post(
    "/:id/like",
    ensureAuthenticated,
    PostController.Like
);

// Comment post
routes.post(
    "/:id/comment",
    ensureAuthenticated,
    PostController.Comment
);

export default routes;