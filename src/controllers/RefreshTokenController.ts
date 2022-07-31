import { Request, Response } from "express";
import { RefreshTokenUser } from "../services/refreshTokenUser";

// Refresh token
export const Refresh = async (request: Request, response: Response) => {
    const { refresh_token } = request.body;
    const token = await RefreshTokenUser(refresh_token);
    return response.json(token);
}