import { client } from "../prisma/client";

export const isFavorited = async (idAttractive: string, idUser: string) => {
    return await client.userFavorites.findFirst({
        where: {
            idAttractive,
            idUser
        }
    });
}

export const getFavorites = async (idUser: string) => {
    return await client.userFavorites.findMany({
        where: { idUser }
    });
}

export const createFavorited = async (idAttractive: string, idUser: string) => {
    return await client.userFavorites.create({
        data: {
            idAttractive,
            idUser
        }
    });
}

export const deleteFavorited = async (id: string) => {
    return await client.userFavorites.delete({
        where: { id }
    });
}