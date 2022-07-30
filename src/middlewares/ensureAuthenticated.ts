import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user: string | (() => string);
}

export const ensureAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: "Token não enviado!"
        });
    }

    const [ , token ] = authToken.split(" ");

    try {
        verify(token, "954b8d2a-fb9d-4be4-a664-5380431c8654", (err, user) => {
            if(err) return response.sendStatus(403).json("Token inválido!");

            (request as CustomRequest).user = user.sub;
        });
        return next();
    } catch(error) {
        return response.status(401).json({
            message: "Token inválido!"
        });
    }
}