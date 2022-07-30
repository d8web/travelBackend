import { client } from "../prisma/client";

export const getPostsFromUser = async (users: string[]) => {
    return await client.post.findMany({
        where: {
            authorId: {
                in: users
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export const getOnePostById = async (id: string) => {
    return await client.post.findUnique({
        where: { id }
    });
}