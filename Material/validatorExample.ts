import { Request, Response } from "express";
import validator from "../src/helpers/validator";

const createValidation = async (req: Request, res: Response) => {
    const validationRule = {
        "email": "required|string|email",
        "type": "required|string",
        "username": "required|string",
        "phone": "required|string",
        "password": "required|string|min:6|confirmed",
        "gender": "string"
    };
    
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: "Validation failed",
                    data: err.errors
                });
        } else {
            res.json({success: true, message: "Vamos lá"})
        }
    }).catch( err => console.log(err))
}