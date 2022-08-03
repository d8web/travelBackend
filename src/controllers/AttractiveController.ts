import { insertImageAttractive } from "../services/imagesAttractiveService";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { createFolder } from "../helpers/createFolder";
import { Attractive } from "../types/AttractiveType";
import { slugify } from "../helpers/manipulateFolderName";

import * as AttractiveService from "../services/attractiveService";
import * as ParkService from "../services/parkService";

import dotenv from "dotenv";
dotenv.config();

// List of all attractives
export const All = async (req: Request, res: Response) => {
    const attractivesList: Attractive[] = await AttractiveService.getAllAttractives();

    for(let i in attractivesList) {
        if(attractivesList[i].images.length > 0) {
            let cover = `${process.env.BASE_URL}/media/images/attractives/${attractivesList[i].images[0].cover}`;
            attractivesList[i].images = cover;
        }
    }

    return res.status(200).json(attractivesList);
}

// Add new attractive
export const NewAttractive = async (req: Request, res: Response) => {

    const { idPark } = req.body;
    const park = await ParkService.getOneParkById(idPark);

    // Verify if park exists before create attractive
    if(park) {
        const attractiveSaved = await AttractiveService.createAttractive(req.body, "");
        return res.status(201).json(attractiveSaved);
    } else {
        return res.status(400).json({
            error: true,
            message: "Park does not exists!"
        });
    }
}

// Add images from attractive
export const AddImages = async (req: Request, res: Response) => {

    const { idAttractive } = req.body;
    const attractive = await AttractiveService.getOneAttractive(idAttractive);

    // Verify if attractives exists
    if(attractive) {
        const files = req.files as { [fieldName: string]: Express.Multer.File[] };

        const cover = files.cover[0];
        const fileName = await resizeAndReturnImage(cover, "attractives");

        const folder = attractive.name;
        createFolder(slugify(folder));

        let names: string[] = [];

        for(let i in files.images) {
            const fileResult = await resizeAndReturnImage(
                files.images[i],
                "moreimages",
                folder
            );
            names.push(fileResult);
        }

        try {
            const savedCoverAndImages = await insertImageAttractive(idAttractive, names);
            res.status(201).json(savedCoverAndImages);
        } catch(err) {
            res.status(400).json({
                error: true,
                message: "Ocorreu um erro!",
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