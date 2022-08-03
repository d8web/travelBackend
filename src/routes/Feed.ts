import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FeedController } from "../controllers";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// Add new post
routes.post(
    "/newPost",
    ensureAuthenticated,
    upload.single("image"),
    FeedController.CreatePost
);

// Get list posts
routes.get(
    "/posts",
    ensureAuthenticated,
    FeedController.AllPosts
);

// Get Feed from user
routes.get(
    "/user/:id",
    ensureAuthenticated,
    FeedController.UserFeed
);

// Get photos from user
routes.get(
    "/user/:id/photos",
    ensureAuthenticated,
    FeedController.PhotosUser
);

export default routes;