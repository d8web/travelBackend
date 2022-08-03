import { Request, Response } from "express";
import { RefreshTokenUser } from "../services/refreshTokenService";
import { AuthService } from "../services/index";

// Refresh token
export const Refresh = async (request: Request, response: Response) => {
    const { refresh_token } = request.body;
    const token = await RefreshTokenUser(refresh_token);
    return response.json(token);
}

// Create user
export const Create = async (request: Request, response: Response) => {
    const { email, name, password } = request.body;

    const user = await AuthService.create({
        name,
        email,
        password
    });

    response.json(user);
}

// Login user
export const AuthUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await AuthService.authenticate({ email, password });
    res.json(token);
}