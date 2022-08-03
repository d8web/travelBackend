import { AttractiveController } from "../controllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

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

export default routes;