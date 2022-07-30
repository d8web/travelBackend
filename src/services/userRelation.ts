import { client } from "../prisma/client";

export const getRelationsFromUser= async (idUser: string) => {
    return client.userRelations.findMany({
        where: {
            userFrom: idUser
        }
    });
}