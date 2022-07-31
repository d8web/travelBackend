import { client } from "../prisma/client";

export const createComment = async (idPost: string, idUser: string, body: string) => {
    return await client.postComments.create({
        data: {
            idPost,
            idUser,
            body
        }
    });
}