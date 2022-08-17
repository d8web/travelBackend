import { ImagesAttractiveService } from "../services/index";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { createFolder } from "../helpers/createFolder";
import { slugify } from "../helpers/manipulateFolderName";
import { unlink } from "fs/promises";

import * as AttractiveService from "../services/attractiveService";
import * as ParkService from "../services/parkService";

import dotenv from "dotenv";
dotenv.config();

// List of all attractives
export const All = async (req: Request, res: Response) => {
    const attractivesList = await AttractiveService.getAllAttractives();

    for (let i in attractivesList) {
        let cover = `${process.env.BASE_URL}/media/images/attractives/${attractivesList[i].cover}`;
        attractivesList[i].cover = cover;
    }

    return res.status(200).json(attractivesList);
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
    const park = await ParkService.getOneParkById(idPark);

    // Verify if park exists before create attractive
    if (park) {

        const vehicleRecomended = req.body.vehicleRecomended === "true";
        const guide = req.body.guide === "true";
        const polluted = req.body.polluted === "true";
        const propertyPrivate = req.body.propertyPrivate === "true";
        const popularLocation = req.body.popularLocation === "true";
        const slipperyStones = req.body.slipperyStones === "true";
        const placeForChildren = req.body.placeForChildren === "true";
        const bestPhotos = req.body.bestPhotos === "true";

        const price = parseInt(req.body.price);

        try {
            const fileName = await resizeAndReturnImage(req.file, "attractives");
            const attractiveSaved = await AttractiveService.createAttractive({
                idPark,
                type,
                name,
                title,
                description,
                latitude,
                longitude,
                vehicleRecomended,
                polluted,
                guide,
                propertyPrivate,
                popularLocation,
                walkingLevel,
                averageWalkingTime,
                slipperyStones,
                distanceOfCarrancas,
                placeForChildren,
                averageDepth,
                averageHeightOfFall,
                bestPhotos,
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

    } else {
        await unlink(req.file.path);
        res.status(400).json({
            error: true,
            message: "Park does not exists!"
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