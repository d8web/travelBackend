import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import multer from "multer";

import * as UserController from "./controllers/UserController";
import * as RefreshTokenController from "./controllers/RefreshTokenController";
import * as AttractiveController from "./controllers/AttractiveController";
import * as ParkController from "./controllers/ParkController";
import * as AgencyController from "./controllers/AgencyController";
import * as TourController from "./controllers/TourController";
import * as FeedController from "./controllers/FeedController";
import * as PostController from "./controllers/PostController";
import * as ConversationController from "./controllers/ConversationController";

const upload = multer({
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
        cb(null, allowed.includes(file.mimetype))
    },
    limits: { fieldSize: 2000000 }
});

const routes = Router();

// Ping route
routes.get(
    "/ping",
    (req: Request, res: Response) =>
    res.json({pong: true})
);

// Create user
routes.post(
    "/auth/create",
    UserController.Create
);

// Login user
routes.post(
    "/auth/login",
    UserController.AuthUser
);

// Refresh token
routes.post(
    "/auth/refresh",
    RefreshTokenController.Refresh
);

// List of attractives
routes.get(
    "/attractives",
    ensureAuthenticated,
    AttractiveController.All
);

// Add new attractives
routes.post(
    "/attractive",
    ensureAuthenticated,
    AttractiveController.NewAttractive
);

// Verify this route
// routes.post(
//     "/upload",
//     ensureAuthenticated,
//     upload.single("image"),
//     AttractiveController.NewAttractive
// );

// Add images and cover from attractive
routes.post(
    "/images",
    upload.fields([
        {name: "cover", maxCount: 1},
        {name: "images", maxCount: 4}
    ]),
    AttractiveController.AddImages
);

// List of parks
routes.get(
    "/parks",
    ensureAuthenticated,
    ParkController.AllParks
);

// Create new park
routes.post(
    "/park",
    ensureAuthenticated,
    upload.single("image"),
    ParkController.Create
);

// Add new agency
routes.post(
    "/agency",
    ensureAuthenticated,
    upload.single("image"),
    AgencyController.CreateAgency
);

// Get list agencies
routes.get(
    "/agencies",
    ensureAuthenticated,
    AgencyController.AllAgencies
);

// Get list tours
routes.get(
    "/tours",
    ensureAuthenticated,
    TourController.AllTours
);

// Add new tour
routes.post(
    "/tour",
    upload.single("image"),
    TourController.Create
);

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

// Like and deslike route toogle
routes.post(
    "/post/:id/like",
    ensureAuthenticated,
    PostController.Like
);

// Comment post
routes.post(
    "/post/:id/comment",
    ensureAuthenticated,
    PostController.Comment
);

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

// Insert a new conversation in the database
routes.post(
    "/conversation",
    ensureAuthenticated,
    ConversationController.Create
);

// Get the conversations by user
routes.get(
    "/conversations",
    ensureAuthenticated,
    ConversationController.FindConversation
);

routes.get(
    "/conversations/find/:id",
    ensureAuthenticated,
    ConversationController.findByTwoUsers
);

export default routes;