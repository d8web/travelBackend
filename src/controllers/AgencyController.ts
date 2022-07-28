import { Request, Response } from "express";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import * as AgencyService from "../services/agencyService";
import dotenv from "dotenv"

dotenv.config();

export const AllAgencies = async (req: Request, res: Response) => {
    const agencyList = await AgencyService.getAllAgencies();

    for(let i in agencyList) {
        agencyList[i].image = `${process.env.BASE_URL}/media/images/agencies/${agencyList[i].image}`
    }

    res.status(200).json(agencyList);
}

export const CreateAgency = async (req: Request, res: Response) => {
    const imageName: string = await resizeAndReturnImage(req.file, "agencies");
    
    const savedAgency = await AgencyService.insertAgency(req.body, imageName);
    res.json(savedAgency);
}