import { insertImageAttractive } from "../services/imagesService";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { createFolder } from "../helpers/createFolder";
import { Attractive } from "../types/AttractiveType";
import * as AttractiveService from "../services/attractiveService";
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
    const attractiveSaved = await AttractiveService.createAttractive(req.body);
    return res.status(201).json(attractiveSaved);
}

// Add images from attractive
export const AddImages = async (req: Request, res: Response) => {
    const { idAttractive } = req.body;

    const attractive = await AttractiveService.getOneAttractive(idAttractive);
    if(attractive) {
        
        const files = req.files as { [fieldName: string]: Express.Multer.File[] };

        const cover = files.cover[0];
        const fileName = await resizeAndReturnImage(cover, "attractives");

        const folder = attractive.name.toLowerCase();
        createFolder(folder);

        let names: string[] = [];

        for (let i in files.images) {
            const fileResult = await resizeAndReturnImage(
                files.images[i],
                "moreimages",
                folder
            );
            names.push(fileResult);
        }

        const savedCoverAndImages = await insertImageAttractive(idAttractive, fileName, names);
        return res.status(201).json(savedCoverAndImages);

    } else {
        res.status(400).json({ error: true, message: "Attractive not found!" });
    }
}