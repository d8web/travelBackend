import { client } from "../prisma/client";

export const getRelationsFromUser= async (idUser: string) => {
    return client.userRelation.findMany({
        where: {
            userFrom: idUser
        }
    });
}

export const verifyRelation = async (userFrom: string, userTo: string) => {
    return client.userRelation.findFirst({
        where: {
            userFrom,
            userTo
        }
    });
}

export const deleteRelation = async (id: string) => {
    return await client.userRelation.delete({
        where: {
            id
        }
    })
}

export const insertRelation = async (userFrom: string, userTo: string) => {
    return await client.userRelation.create({
        data: {
            userFrom,
            userTo
        }
    });
}

export const getFollowers = async (userTo: string) => {
    return await client.userRelation.findMany({
        where: {
            userTo
        }
    });
}

export const getFollowing = async (userFrom: string) => {
    return await client.userRelation.findMany({
        where: {
            userFrom
        }
    });
}