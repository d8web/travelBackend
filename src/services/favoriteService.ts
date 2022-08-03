import { client } from "../prisma/client";

export const isFavorited = async (idAttractive: string, idUser: string) => {
    return await client.userFavorite.findFirst({
        where: {
            idAttractive,
            idUser
        }
    });
}

export const getFavorites = async (idUser: string) => {
    return await client.userFavorite.findMany({
        where: { idUser }
    });
}

export const createFavorited = async (idAttractive: string, idUser: string) => {
    return await client.userFavorite.create({
        data: {
            idAttractive,
            idUser
        }
    });
}

export const deleteFavorited = async (id: string) => {
    return await client.userFavorite.delete({
        where: { id }
    });
}