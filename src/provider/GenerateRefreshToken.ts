import dayjs from "dayjs";
import { client } from "../prisma/client"

export const GenerateRefreshToken = async (userId: string) => {
    const expiresIn = dayjs().add(2, "hours").unix();

    const generateRefreshToken = await client.refreshToken.create({
        data: {
            userId,
            expiresIn,
        }
    });

    return generateRefreshToken;
}