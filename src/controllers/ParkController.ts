import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { ParkService } from "../services/index";
import dotenv from "dotenv";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";
dotenv.config();

// Get all parks
export const AllParks = async (req: Request, res: Response) => {
    const parks = await ParkService.getAllParks();
    
    for(let i in parks) {
        parks[i].image = `${process.env.BASE_URL}/media/images/parks/${parks[i].image}`
    }

    res.status(200).json(parks);
}

// Create park
export const Create = async (req: Request, res: Response) => {
    const imageName: string = await resizeAndReturnImage(req.file, "parks");

    const {
        name,
        phone,
        whatsapp,
        mainWaterfall,
        latitude,
        longitude,
        facebook,
        instagram,
        othersSocialMedia,
    } = req.body;

    const privateLocation = convertStringToBoolean(req.body.private);
    const restaurant = convertStringToBoolean(req.body.restaurant);
    const parking = convertStringToBoolean(req.body.parking);
    const hotel = convertStringToBoolean(req.body.hotel);
    const price = parseFloat(req.body.price);
    const wifi = convertStringToBoolean(req.body.wifi);
    const bath = convertStringToBoolean(req.body.bath);

    const savedPark = await ParkService.insertPark({
        private: privateLocation,
        othersSocialMedia,
        mainWaterfall,
        restaurant,
        longitude,
        instagram,
        latitude,
        whatsapp,
        facebook,
        parking,
        price,
        phone,
        hotel,
        name,
        wifi,
        bath,
    }, imageName);
    
    res.status(201).json(savedPark);
}