import { PrismaClient } from "@prisma/client";
import { AgencyType } from "../types/AgencyType";

const prisma = new PrismaClient();

export const getAllAgencies = async () => {
    return prisma.agency.findMany({
        select: {
            id: true,
            name: true,
            phone: true,
            whatsapp: true,
            image: true,
            // tours: true
        }
    });
}

export const insertAgency = async (agencyObject: AgencyType, image?: string) => {
    return await prisma.agency.create({
        data: {
            name: agencyObject.name,
            address: agencyObject.address,
            type: agencyObject.type,
            image: image,
            website: agencyObject.website,
            phone: agencyObject.phone,
            whatsapp: agencyObject.whatsapp,
            facebook: agencyObject.facebook,
            instagram: agencyObject.instagram,
            otherSocialMedia: agencyObject.otherSocialMedia,
        }
    });
}