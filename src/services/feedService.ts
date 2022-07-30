import { PrismaClient } from "@prisma/client";
import { FeedType } from "../types/FeedType";

const prisma = new PrismaClient();

export const createPost = async (post: FeedType) => {
    return await prisma.post.create({
        data: {
            body: post.body,
            type: post.type,
            authorId: post.authorId
        }
    });
}