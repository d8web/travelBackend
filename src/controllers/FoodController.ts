import { Request, Response } from "express";
import { resizeAndReturnImage } from "../helpers/imageManipulate";

export const All = async (req: Request, res: Response) => {

}

export const Create = async (req: Request, res: Response) => {
    const othersSocialMedia = [JSON.parse(req.body.othersSocialMedia)];
    const typeFood = [JSON.parse(req.body.typeFood)];

    res.json({
        socials: othersSocialMedia,
        foodType: typeFood,
        image: req.file
    });
}

export const One = async (req: Request, res: Response) => {

}