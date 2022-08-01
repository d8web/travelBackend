import { Request, Response } from "express";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import validator from "../helpers/validator";
import * as BusinessService from "../services/businessService";

export const Create = async (req: Request, res: Response) => {

    const validationRule = {
        "type": "required|string",
        "name": "required|string"
    };

    await validator(req.body, validationRule, {}, async (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: "Validation failed",
                    data: err.errors
                });
        } else {
            
            const {
                name,
                address,
                type,
                phone,
                whatsapp,
                website,
                otherSocialMedia,
                instagram,
                facebook,
            } = req.body;
        
            let imageName = "";

            if(req.file) {
                imageName = await resizeAndReturnImage(req.file, "business");
            }

            try {
                const savedBusiness = await BusinessService.createBusiness({
                    name,
                    address,
                    type,
                    phone,
                    image: imageName !== "" ? imageName : "cover.jpg",
                    whatsapp,
                    website,
                    instagram,
                    facebook,
                    otherSocialMedia,
                });

                res.status(201).json(savedBusiness);
            } catch(err) {
                res.status(400).json({
                    error: true,
                    message: "Ocorreu um erro!",
                    realError: err
                });
            }
        }
    }).catch((err) => {
        res.status(400).json(err);
    });

}

export const All = async (req: Request, res: Response) => {
    try {

        const allBussiness = await BusinessService.getAll();
        res.status(200).json(allBussiness);

    } catch(err) {
        res.status(400).json({
            error: true,
            message: "Ocorreu um erro!",
            realError: err
        });
    }
}

export const One = async (req: Request, res: Response) => {

    const { id } = req.params;
    if(id) {

        const businessExists = await BusinessService.getOne(id);
        if(businessExists) {
            res.status(200).json(businessExists);
        } else {
            res.status(400).json({
                error: true,
                message: "Business not found!"
            });
        }

    } else {
        res.status(400).json({
            error: true,
            message: "Id not sending!"
        });
    }

}