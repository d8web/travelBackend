import { Request, Response } from "express";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import * as TourService from "../services/tourService";
import * as AttractiveService from "../services/attractiveService";

export const Create = async (req: Request, res: Response) => {

    const imageName: string = await resizeAndReturnImage(req.file, "tours");

    const {
        idAgency,
        name,
        meansOfLocomotion,
        guidesOnVehicleClient,
        video,
        minPeople,
        specialPrice,
        descriptionTour,
        whatsToTake,
        hasWalk,
        observations
    } = req.body;

    const array = req.body.attractives;
    const attractives = array.split(",");

    const pricePerPeople = parseFloat(req.body.pricePerPeople);
    const groups = req.body.groups === "true";
    const maxPeople = parseInt(req.body.maxPeople);

    const savedTour = await TourService.insertTour({
        idAgency,
        attractives,
        name,
        meansOfLocomotion,
        guidesOnVehicleClient,
        video,
        groups,
        maxPeople,
        minPeople,
        pricePerPeople,
        specialPrice,
        descriptionTour,
        whatsToTake,
        hasWalk,
        observations
    }, imageName);
    res.json(savedTour);
}

export const AllTours = async (req: Request, res: Response) => {
    const allTours = await TourService.allTours();
    
    const result = [];

    for(let i in allTours) {
        const attractives = await AttractiveService.getAttractivesFromTour(allTours[i].attractives);

        result.push({
            name: allTours[i].name,
            maxPeople: allTours[i].maxPeople,
            attractivesIncludes: attractives
        });
    }

    res.json(result);
}