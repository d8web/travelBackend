import { client } from "../prisma/client";
import { ServiceType } from "../types/ServiceType";

export const create = async (data: ServiceType) => {
    return await client.service.create({
        data: {
            idAgency: data.idAgency,
            name: data.name,
            price: data.price,
            duration: data.duration,
            tours: data.tours,
        }
    });
}