import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertImageAttractive = async (idAttractive: string, images: string[]) => {
    return await prisma.imagesAttractive.create({
        data: {
            idAttractive,
            images
        }
    });
}