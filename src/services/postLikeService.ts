import { client } from "../prisma/client";

export const Like = async (idPost: string, idUser: string) => {
    return await client.postLike.create({
        data: {
            idPost,
            idUser
        }
    });
}

export const Deslike = async (id: string) => {
    return await client.postLike.delete({
        where: { id }
    })
}

export const VerifyIsLiked = async (idPost: string, idUser: string) => {
    return await client.postLike.findFirst({
        where: {
            idPost,
            idUser
        }
    });
}

export const countLikesFromPost = async (id: string) => {
    return client.postLike.count({
        where: {
            idPost: id
        }
    });
}