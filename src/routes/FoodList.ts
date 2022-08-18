import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FoodListController } from "../controllers/index";
import { Router } from "express";
import upload from "../helpers/multer";

const routes = Router();

routes.post(
    "/",
    ensureAuthenticated,
    upload.single("image"),
    FoodListController.Create
);

export default routes;