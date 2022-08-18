import { FoodType } from "../types/FoodType";
import { client } from "../prisma/client";

export const create = async (data: FoodType, imageName: string) => {
    return await client.food.create({
        data: {
            type: data.type,
            typeFood: data.typeFood,
            name: data.name,
            ownerName: data.ownerName,
            image: imageName !== "" ? imageName : "cover.jpg",
            businessPermit: data.businessPermit,
            number: data.number,
            phone: data.phone,
            whatsapp: data.whatsapp,
            hourOpen: data.hourOpen,
            hourClosed: data.hourClosed,
            delivery: data.delivery,
            website: data.website,
            facebook: data.facebook,
            instagram: data.instagram,
            othersSocialMedia: data.othersSocialMedia,
            acceptReservation: data.acceptReservation,
            acceptOrders: data.acceptOrders,
            reference: data.reference,
            mainCourse: data.mainCourse,
            driversRate: data.driversRate,
            latitude: data.latitude,
            longitude: data.longitude,
            acceptPets: data.acceptPets,
            bestFood: data.bestFood,
            registrationStatus: data.registrationStatus,
            observations: data.observations
        }
    });
}

export const getAll = async () => {
    return await client.food.findMany();
}