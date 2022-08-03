import { AuthController } from "../controllers";
import { Router } from "express";

const routes = Router();

// Refresh token
routes.post(
    "/refresh",
    AuthController.Refresh
);

// Create user
routes.post(
    "/create",
    AuthController.Create
);

// Login user
routes.post(
    "/login",
    AuthController.AuthUser
);

export default routes;