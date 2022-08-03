import { client } from "../prisma/client";

export const createComment = async (idPost: string, idUser: string, body: string) => {
    return await client.postComment.create({
        data: {
            idPost,
            idUser,
            body
        }
    });
}