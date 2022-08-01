import { client } from "../prisma/client";

export const insertMessage = async (sender: string, conversationId: string, text: string) => {
    return await client.message.create({
        data: {
            sender,
            conversationId,
            text
        }
    });
}