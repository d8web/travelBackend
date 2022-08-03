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
    FeedController.createPost
);

// Get list posts
routes.get(
    "/posts",
    ensureAuthenticated,
    FeedController.allPosts
);

// Get Feed from user
routes.get(
    "/user/:id/feed",
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