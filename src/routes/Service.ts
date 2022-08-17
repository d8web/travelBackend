import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ServiceController } from "../controllers";
import { Router } from "express";
// import upload from "../helpers/multer";

const routes = Router();

// Add new service
routes.post(
    "/",
    ensureAuthenticated,
    ServiceController.Create
);

export default routes;