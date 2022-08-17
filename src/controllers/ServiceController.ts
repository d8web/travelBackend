import { AgencyService, TourService } from "../services/index";
import { Request, Response } from "express";

export const Create = async (req: Request, res: Response) => {
    const { idAgency, idTour } = req.body;
    if(idAgency && idTour) {

        const agencyExists = await AgencyService.getOneAgency(idAgency);
        const tourExists = await TourService.getOneTour(idTour, idAgency);
        
        if(agencyExists && tourExists) {
            res.status(201).json({
                message: "Service created sucessfull."
            });
        }

    } else {
        res.status(400).json({
            error: true,
            message: "Id agency or IdTour not send or not found!"
        });
    }
}

export const GetServicesByAgencyId = async (req: Request, res: Response) => {

}