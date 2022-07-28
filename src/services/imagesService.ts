import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertImageAttractive = async (idAttractive: string, cover: string, url: string[]) => {
    return await prisma.image.create({
        data: {
            idAttractive,
            cover,
            url
        }
    });
}