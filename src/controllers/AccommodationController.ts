import { AccommodationService } from "../services/index";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import validator from "../helpers/validator";

export const AllAccomodations = async (req: Request, res: Response) => {
    try {
        const listAccommodations = await AccommodationService.all();
        res.status(200).json(listAccommodations);
    } catch(err) {
        res.status(400).json({
            error: true,
            message: "Ocorreu um erro!",
            realError: err
        });
    }
}

export const GetOneAcommodation = async (req: Request, res: Response) => {
    const validationRule = {
        "id": "required|string"
    };

    await validator(req.params, validationRule, {}, async (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: "Validation failed",
                    data: err.errors
                });
        } else {

            const { id } = req.params;
            const accommodationExists = await AccommodationService.getOne(id);

            if(accommodationExists) {
                res.status(200).json(accommodationExists);
            } else {
                res.status(400).json({
                    error: true,
                    message: "Accommodation does not exists!"
                });
            }


        }
    }).catch((err) => {
        res.status(400).json(err);
    });
}

export const Create = async (req: Request, res: Response) => {
    const validationRule = {
        "type": "required|string"
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
                type,
                phone,
                whatsapp,
                website,
                booking,
                bestaccommodation,
                acceptPets
            } = req.body;
        
            const bestaccommodationFinally = bestaccommodation === "true";
            let imageName = "";

            if(req.file) {
                imageName = await resizeAndReturnImage(req.file, "accommodations");
            }

            try {
                const savedAccommodation = await AccommodationService.create({
                    type,
                    phone,
                    image: imageName !== "" ? imageName : "cover.jpg",
                    whatsapp,
                    website,
                    booking,
                    bestaccommodation: bestaccommodationFinally,
                    acceptPets: acceptPets === "true"
                });

                res.status(201).json(savedAccommodation);
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