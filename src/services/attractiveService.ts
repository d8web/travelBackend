import { PrismaClient } from "@prisma/client"
import { Attractive } from "../types/AttractiveType";

const prisma = new PrismaClient();

export const getAllAttractives = async (idUser: string) => {
    return prisma.attractive.findMany({
        select: {
            id: true,
            idPark: true,
            type: true,
            title: true,
            name: true,
            cover: true,
            UserFavorite: {
                select: {
                    id: true
                },
                where: {
                    idUser
                }
            },
            parks: {
                select: {
                    name: true,
                    price: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export const createAttractive = async (attractive: Attractive, image: string) => {
    return await prisma.attractive.create({
        data: {
            idPark: attractive.idPark,
            type: attractive.type,
            name: attractive.name,
            title: attractive.title,
            cover: image !== "" ? image : "cover.jpg",
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
            openVisits: attractive.openVisits,
            historicalHeritage: attractive.historicalHeritage,
            observations: attractive.observations
        }
    });
}

export const getOneAttractive = async (idAttractive: string) => {
    return await prisma.attractive.findUnique({
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
    return await prisma.attractive.findMany({
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