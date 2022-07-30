import { client } from "../prisma/client";

export const getOneUserById = async (id: string) => {
    return await client.user.findUnique({
        where: { id }
    })
}