import { ConversationController } from "../controllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";

const routes = Router();

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

// Get messages by user logged and id sending in req.params
routes.get(
    "/conversations/find/:id",
    ensureAuthenticated,
    ConversationController.FindByTwoUsers
);

export default routes;