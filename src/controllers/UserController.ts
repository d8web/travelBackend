import { Request, Response } from "express";
import { authenticate, create } from "../services/authService";
// import Validator from "validator";

export const Create = async (request: Request, response: Response) => {
    const { username, name, password } = request.body;

    // if(Validator.isEmail(username)) {
    //     response.json({certo: true, message: "é um email válido"});
    // } else {
    //     response.json({certo: false, message: "não é um email válido"});
    // }

    const user = await create({
        name,
        username,
        password
    });

    response.json(user);
}

export const AuthUser = async (request: Request, response: Response) => {
    const { username, password } = request.body;

    const token = await authenticate({ username, password });

    response.json(token);
}