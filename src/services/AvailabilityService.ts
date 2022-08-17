import { client } from "../prisma/client";
import { AvailabilityType } from "../types/AvailabilityType";

export const createAvailability = async (data: AvailabilityType) => {
    return await client.serviceAvailability.create({
        data: {
            idAgency: data.idAgency,
            weekday: data.weekday,
            numberOfVacancies: data.numberOfVacancies,
            hours: data.hours,
            maxPeople: data.maxPeople,
            minPeople: data.minPeople,
        }
    });
}