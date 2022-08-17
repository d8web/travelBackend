import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user: string | (() => string);
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    let success = false;

    // JWT auth
    if (req.headers.authorization) {
        let [authType, token] = req.headers.authorization.split(" ");
        if (authType === "Bearer") {
            try {
                verify(token, "954b8d2a-fb9d-4be4-a664-5380431c8654", (err, user) => {
                    (req as CustomRequest).user = user.sub;
                    success = true;
                });
                success = true;
            } catch (error) { }
        }
    }

    if (success) {
        next();
    } else {
        res.status(401).json({ error: "Not authorized" });
    }
};
