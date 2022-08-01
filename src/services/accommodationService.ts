import { client } from "../prisma/client";
import { AccommodationType } from "../types/AccommodationType";

export const getOne = async (id: string) => {
    return await client.accommodation.findFirst({
        where: { id }
    });
}

export const create = async (data: AccommodationType) => {
    return await client.accommodation.create({
        data: {
            type: data.type,
            image: data.image,
            phone: data.phone,
            whatsapp: data.whatsapp,
            website: data.website,
            booking: data.booking,
            bestaccommodation: data.bestaccommodation
        }
    });
}

export const all = async () => {
    return await client.accommodation.findMany();
}