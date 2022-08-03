import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { MessageController } from "../controllers";
import { Router } from "express";

const routes = Router();

// Add new message
routes.post(
    "/messages",
    ensureAuthenticated,
    MessageController.createMessage
);

export default routes;