import { AttractiveService, ParkService, ImagesAttractiveService } from "../services";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { createFolder } from "../helpers/createFolder";
import { slugify } from "../helpers/manipulateFolderName";
import { unlink } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

// List of all attractives
export const All = async (req: Request, res: Response) => {
    const attractivesList = await AttractiveService.getAllAttractives();

    for (let i in attractivesList) {
        let cover = `${process.env.BASE_URL}/media/images/attractives/${attractivesList[i].cover}`;
        attractivesList[i].cover = cover;
    }

    res.status(200).json({ total: attractivesList.length, attractivesList});
}

// Add new attractive
export const NewAttractive = async (req: Request, res: Response) => {

    const {
        idPark,
        type,
        name,
        title,
        description,
        latitude,
        longitude,
        walkingLevel,
        averageWalkingTime,
        distanceOfCarrancas,
        averageDepth,
        averageHeightOfFall,
        observations
    } = req.body;

    // Verify if send idPark
    if(idPark) {
        const parkExists = await ParkService.getOneParkById(idPark);
        // Verify if park exists before create attractive
        if (!parkExists) {
            res.status(400).json({
                error: true,
                message: "Park does not exists!"
            });
        }
    }

    const vehicleRecomended = convertStringToBoolean(req.body.vehicleRecomended);
    const guide = convertStringToBoolean(req.body.guide);
    const polluted = convertStringToBoolean(req.body.polluted);
    const propertyPrivate = convertStringToBoolean(req.body.propertyPrivate);
    const popularLocation = convertStringToBoolean(req.body.popularLocation);
    const slipperyStones = convertStringToBoolean(req.body.slipperyStones);
    const placeForChildren = convertStringToBoolean(req.body.placeForChildren);
    const bestPhotos = convertStringToBoolean(req.body.bestPhotos);
    
    try {
        let fileName = "";
        if(req.file) {
            fileName = await resizeAndReturnImage(req.file, "attractives");
        }
        const attractiveSaved = await AttractiveService.createAttractive({
            vehicleRecomended,
            guide,
            polluted,
            propertyPrivate,
            popularLocation,
            slipperyStones,
            placeForChildren,
            bestPhotos,
            idPark,
            type,
            name,
            title,
            description,
            latitude,
            longitude,
            walkingLevel,
            averageWalkingTime,
            distanceOfCarrancas,
            averageDepth,
            averageHeightOfFall,
            observations
        }, fileName);
        res.status(201).json(attractiveSaved);

    } catch (err) {
        res.status(400).json({
            error: true,
            message: "An error has occurred",
            realError: err
        });
    }

}

// Add new images
export const NewImages = async (req: Request, res: Response) => {
    const { idAttractive } = req.body;
    const attractive = await AttractiveService.getOneAttractive(idAttractive);

    // Verify if attractives exists
    if (attractive) {
        const files = req.files as Express.Multer.File[];

        const folder = attractive.name;
        const result = createFolder(slugify(folder));

        let names: string[] = [];

        for (let i in files) {
            const fileResult = await resizeAndReturnImage(
                files[i],
                "moreimages",
                slugify(folder)
            );
            names.push(fileResult);
        }

        try {
            const savedCoverAndImages = await ImagesAttractiveService.insertImageAttractive(idAttractive, names);
            res.status(201).json(savedCoverAndImages);
        } catch (err) {
            res.status(400).json({
                error: true,
                message: "An error has occurred",
                realMessage: err
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "Attractive not found!"
        });
    }
}

// Add images old from attractive as express fields
export const AddImages = async (req: Request, res: Response) => {

    const { idAttractive } = req.body;
    const attractive = await AttractiveService.getOneAttractive(idAttractive);

    // Verify if attractives exists
    if (attractive) {
        const files = req.files as { [fieldName: string]: Express.Multer.File[] };

        const cover = files.cover[0];
        const fileName = await resizeAndReturnImage(cover, "attractives");

        const folder = attractive.name;
        createFolder(slugify(folder));

        let names: string[] = [];

        for (let i in files.images) {
            const fileResult = await resizeAndReturnImage(
                files.images[i],
                "moreimages",
                slugify(folder)
            );
            names.push(fileResult);
        }

        try {
            const savedCoverAndImages = await ImagesAttractiveService.insertImageAttractive(idAttractive, names);
            res.status(201).json(savedCoverAndImages);
        } catch (err) {
            res.status(400).json({
                error: true,
                message: "An error has occurred",
                realMessage: err
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "Attractive not found!"
        });
    }
}