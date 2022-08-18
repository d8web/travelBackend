import { convertStringToBoolean } from "../helpers/convertStringToBoolean";
import { convertStringToNumber } from "../helpers/convertStringToNumber";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { FoodService } from "../services";

export const All = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await FoodService.getAll());
    } catch(err) {
        res.status(400).json({
            error: true,
            message: "An error has occurred",
            realError: err
        });
    }
}

export const Create = async (req: Request, res: Response) => {

    let fileName = "";
    if(req.file) {
        fileName = await resizeAndReturnImage(req.file, "foods");
    }

    const acceptReservation = convertStringToBoolean(req.body.acceptReservation);
    const acceptOrders = convertStringToBoolean(req.body.acceptOrders);
    const acceptPets = convertStringToBoolean(req.body.acceptPets);
    const delivery = convertStringToBoolean(req.body.delivery);
    const bestFood = convertStringToBoolean(req.body.bestFood);

    const driversRate = convertStringToNumber(req.body.driversRate);

    try {
        const savedFood = await FoodService.create({
            acceptReservation,
            acceptOrders,
            driversRate,
            acceptPets,
            delivery,
            bestFood,
            type: req.body.type,
            typeFood: req.body.typeFood,
            name: req.body.name,
            ownerName: req.body.ownerName,
            image: req.body.image,
            businessPermit: req.body.businessPermit,
            number: req.body.number,
            phone: req.body.phone,
            whatsapp: req.body.whatsapp,
            hourOpen: req.body.hourOpen,
            hourClosed: req.body.hourClosed,
            website: req.body.website,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            othersSocialMedia: req.body.othersSocialMedia,
            reference: req.body.reference,
            mainCourse: req.body.mainCourse,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            observations: req.body.observations,
        }, fileName);
        res.status(201).json(savedFood);

    } catch (err) {
        res.status(400).json({
            error: true,
            message: "An error has occurred",
            realError: err
        });
    }
}

export const One = async (req: Request, res: Response) => {

}