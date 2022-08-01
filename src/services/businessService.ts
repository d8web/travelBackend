import { client } from "../prisma/client";
import { BusinessType } from "../types/BusinessType";

export const getOne = async (id: string) => {
    return await client.business.findFirst({
        where: { id }
    });
}

export const getAll = async () => {
    return await client.business.findMany();
}

export const createBusiness = async (businessData: BusinessType) => {
    return await client.business.create({
        data: {
            name: businessData.name,
            address: businessData.address,
            type: businessData.type,
            image: businessData.image,
            website: businessData.website,
            phone: businessData.phone,
            whatsapp: businessData.whatsapp,
            facebook: businessData.facebook,
            instagram: businessData.instagram,
            otherSocialMedia: businessData.otherSocialMedia
        }
    });
}