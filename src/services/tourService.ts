import { PrismaClient } from "@prisma/client";
import { TourType } from "../types/TourType";

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
            id: true,
            idAgency: true,
            background: true,
            duration: true,
            groups: true,
            images: true,
            vehicle: true,
            video: true,
            guidesOnVehicleClient: true,
            name: true,
            attractives: true
        }
    });
}

export const getOneTour = async (id: string, idAgency: string) => {
    return await prisma.tour.findFirst({
        where: { id, idAgency }
    });
}