import { client } from "../prisma/client";

export const Like = async (idPost: string, idUser: string) => {
    return await client.postLikes.create({
        data: {
            idPost,
            idUser
        }
    });
}

export const Deslike = async (id: string) => {
    return await client.postLikes.delete({
        where: { id }
    })
}

export const VerifyIsLiked = async (idPost: string, idUser: string) => {
    return await client.postLikes.findFirst({
        where: {
            idPost,
            idUser
        }
    });
}

export const countLikesFromPost = async (id: string) => {
    return client.postLikes.count({
        where: {
            idPost: id
        }
    });
}