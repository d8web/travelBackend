import { PrismaClient } from "@prisma/client";
import { TourType } from "../types/tourType";

const prisma = new PrismaClient();

export const insertTour = async (tourObject: TourType, image?: string) => {
    return await prisma.tour.create({
        data: {
            idAgency: tourObject.idAgency,
            attractives: tourObject.attractives,
            name: tourObject.name,
            meansOfLocomotion: tourObject.meansOfLocomotion,
            guidesOnVehicleClient: tourObject.guidesOnVehicleClient,
            background: image,
            video: tourObject.video,
            groups: tourObject.groups,
            maxPeople: tourObject.maxPeople,
            minPeople: tourObject.minPeople,
            duration: tourObject.duration,
            pricePerPeople: tourObject.pricePerPeople,
            specialPrice: tourObject.specialPrice,
            descriptionTour: tourObject.descriptionTour,
            whatsToTake: tourObject.whatsToTake,
            hasWalk: tourObject.hasWalk,
            observations: tourObject.observations
        }
    });
}

export const allTours = async () => {
    return await prisma.tour.findMany({
        select: {
            name: true,
            maxPeople: true,
            attractives: true
        }
    });
}