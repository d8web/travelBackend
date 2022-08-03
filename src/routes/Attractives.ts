import { AttractiveController } from "../controllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

// List of attractives
routes.get(
    "/",
    ensureAuthenticated,
    AttractiveController.All
);

// Add new attractives
routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
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
    "/images/old",
    ensureAuthenticated,
    upload.fields([
        {name: "cover", maxCount: 1},
        {name: "images", maxCount: 4}
    ]),
    AttractiveController.AddImages
);

routes.post(
    "/images",
    ensureAuthenticated,
    upload.array("images"),
    AttractiveController.NewImages
);

export default routes;