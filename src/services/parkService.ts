import { PrismaClient } from "@prisma/client";
import { ParkType } from "../types/ParkType";

const prisma = new PrismaClient();

export const getAllParks = async () => {
    return prisma.park.findMany({
        select: {
            id: true,
            image: true,
            price: true,
            // attractiveList: true
        }
    });
}

export const insertPark = async (parkObject: ParkType, image: string) => {
    return await prisma.park.create({
        data: {
            name: parkObject.name,
            image,
            price: parkObject.price,
            wifi: parkObject.wifi,
            bath: parkObject.bath,
            restaurant: parkObject.restaurant,
            parking: parkObject.parking,
            private: parkObject.private,
            hotel: parkObject.hotel,
            mainWaterfall: parkObject.mainWaterfall,
            latitude: parkObject.latitude,
            longitude: parkObject.longitude
        }
    });
}