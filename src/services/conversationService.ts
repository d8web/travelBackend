import { client } from "../prisma/client";

export const create = async (senderId: string, receiverId: string) => {
    return await client.conversation.create({
        data: {
            members: [senderId, receiverId]
        }
    });
}

export const conversationExistsById = async (id: string) => {
    return await client.conversation.findFirst({
        where: { id }
    });
}

export const getConversationsById = async (id: string) => {
    return await client.conversation.findMany({
        where: {
            members: {
                has: id
            },
        }
    });
}

export const getOneConversationByMembers = async (loggedId: string, id: string) => {
    return await client.conversation.findFirst({
        where: {
            members: {
                equals: [loggedId, id]
            }
        }
    });
}