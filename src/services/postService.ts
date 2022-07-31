import { client } from "../prisma/client";

export const getPostsFromUser = async (users: string[]) => {
    return await client.post.findMany({
        select: {
            id: true,
            type: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
            comments: {
                select: {
                    idUser: true,
                    body: true,
                    createdAt: true
                }
            },
            likes: {
                select: {
                    id: true,
                    idPost: true,
                    idUser: true
                }
            }
        },
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

export const getPostsFromFeedUser = async (authorId: string) => {
    return await client.post.findMany({
        select: {
            id: true,
            type: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
            comments: {
                select: {
                    idUser: true,
                    body: true,
                    createdAt: true
                }
            },
            likes: {
                select: {
                    id: true,
                    idPost: true,
                    idUser: true
                }
            }
        },
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export const getPhotosFromUser = async (authorId: string, type: string) => {
    return await client.post.findMany({
        select: {
            id: true,
            type: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
            comments: {
                select: {
                    idUser: true,
                    body: true,
                    createdAt: true
                }
            },
            likes: {
                select: {
                    id: true,
                    idPost: true,
                    idUser: true
                }
            }
        },
        where: {
            authorId,
            type
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}