import { TourService, AgencyService } from "../services/index";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { AttractiveService } from "../services/index";
import { Request, Response } from "express";
import { unlink } from "fs/promises";

// Create a new tour
export const Create = async (req: Request, res: Response) => {

    const imageName: string = await resizeAndReturnImage(req.file, "tours");

    const {
        idAgency,
        name,
        meansOfLocomotion,
        guidesOnVehicleClient,
        video,
        duration,
        specialPrice,
        descriptionTour,
        whatsToTake,
        hasWalk,
        observations
    } = req.body;

    const agencyExists = await AgencyService.getOneAgency(idAgency);
    
    if(agencyExists) {
        const array = req.body.attractives;
        const attractives = array.split(",");
    
        const pricePerPeople = parseFloat(req.body.pricePerPeople);
        const groups = req.body.groups === "true";
    
        try {
            const savedTour = await TourService.insertTour({
                idAgency,
                attractives,
                name,
                meansOfLocomotion,
                guidesOnVehicleClient,
                video,
                groups,
                duration,
                pricePerPeople,
                specialPrice,
                descriptionTour,
                whatsToTake,
                hasWalk,
                observations
            }, imageName);
            res.json(savedTour);
        } catch(err) {
            await unlink("./public/media/images/tours/"+imageName)
            res.status(400).json({
                error: true,
                message: "An error has occurred",
                realError: err
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "Agency not exists or not found!"
        });
    }
}

// Get all tours
export const AllTours = async (req: Request, res: Response) => {
    const allTours = await TourService.allTours();
    
    const result = [];

    for(let i in allTours) {
        const attractives = await AttractiveService.getAttractivesFromTour(allTours[i].attractives);

        result.push({
            id: allTours[i].id,
            name: allTours[i].name,
            attractivesIncludes: attractives
        });
    }

    res.json(allTours);
}