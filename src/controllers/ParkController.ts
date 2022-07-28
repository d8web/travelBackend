import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import * as ParkService from "../services/parkService";
import dotenv from "dotenv";

dotenv.config();

// Get all parks
export const AllParks = async (req: Request, res: Response) => {
    const parks = await ParkService.getAllParks();
    
    for(let i in parks) {
        parks[i].image = `${process.env.BASE_URL}/parks/${parks[i].image}`
    }

    res.status(200).json(parks);
}

// Create park
export const Create = async (req: Request, res: Response) => {
    const imageName: string = await resizeAndReturnImage(req.file, "parks");

    const {
        name,
        mainWaterfall,
        latitude,
        longitude
    } = req.body;

    const price = parseFloat(req.body.price);
    const wifi = req.body.wifi === "true";
    const bath = req.body.bath === "true";
    const restaurant = req.body.restaurant === "true";
    const parking = req.body.parking === "true";
    const privateLocation = req.body.private === "true";
    const hotel = req.body.hotel === "true";

    const savedPark = await ParkService.insertPark({
        name,
        price,
        wifi,
        bath,
        restaurant,
        parking,
        private: privateLocation,
        hotel,
        mainWaterfall,
        latitude,
        longitude
    }, imageName);
    
    res.status(201).json(savedPark);
}