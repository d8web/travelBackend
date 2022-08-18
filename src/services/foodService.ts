import { client } from "../prisma/client";
import { FoodType } from "../types/FoodType";

export const create = async (data: FoodType) => {
    return await client.food.create({
        data: {
            type: data.type,
            typeFood: data.typeFood,
            name: data.name,
            ownerName: data.ownerName,
            image: data.image,
            phone: data.phone,
            whatsapp: data.whatsapp,
            hourOpen: data.hourOpen,
            hourClosed: data.hourClosed,
            delivery: data.delivery,
            menu: data.menu,
            website: data.website,
            facebook: data.facebook,
            instagram: data.instagram,
            othersSocialMedia: data.othersSocialMedia,
            acceptReservation: data.acceptReservation,
            acceptOrders: data.acceptOrders,
            reference: data.reference,
            mainCourse: data.mainCourse,
            maxOrderAllowed: data.maxOrderAllowed,
            commissionPercent: data.commissionPercent,
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