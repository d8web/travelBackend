import { PrismaClient } from "@prisma/client"
import { Attractive } from "../types/AttractiveType";

const prisma = new PrismaClient();

export const getAllAttractives = async () => {
    return prisma.attractives.findMany({
        select: {
            id: true,
            idPark: true,
            type: true,
            title: true,
            name: true,
            cover: true
        }
    });
}

export const createAttractive = async (attractive: Attractive, image: string) => {
    return await prisma.attractives.create({
        data: {
            idPark: attractive.idPark,
            type: attractive.type,
            name: attractive.name,
            title: attractive.title,
            cover: image,
            description: attractive.description,
            latitude: attractive.latitude,
            longitude: attractive.longitude,
            vehicleRecomended: attractive.vehicleRecomended,
            polluted: attractive.polluted,
            guide: attractive.guide,
            propertyPrivate: attractive.propertyPrivate,
            popularLocation: attractive.popularLocation,
            walkingLevel: attractive.walkingLevel,
            averageWalkingTime: attractive.averageWalkingTime,
            slipperyStones: attractive.slipperyStones,
            distanceOfCarrancas: attractive.distanceOfCarrancas,
            placeForChildren: attractive.placeForChildren,
            averageDepth: attractive.averageDepth,
            averageHeightOfFall: attractive.averageHeightOfFall,
            bestPhotos: attractive.bestPhotos,
            observations: attractive.observations
        }
    });
}

export const getOneAttractive = async (idAttractive: string) => {
    return await prisma.attractives.findUnique({
        select: {
            id: true,
            name: true,
            images: {
                select: {
                    id: true,
                    images: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        },
        where: {
            id: idAttractive
        },
    });
}

export const getAttractivesFromTour = async (ids: string[]) => {
    return await prisma.attractives.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            id: {
                in: ids.map(i => i)
            }
        },
    });
}