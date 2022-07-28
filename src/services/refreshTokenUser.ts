import { GenerateTokenProvider } from "../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { client } from "../prisma/client";
import dayjs from "dayjs";

export const RefreshTokenUser = async (refresh_Token: string) => {
    const refreshToken = await client.refreshToken.findFirst({
        where: {
            id: refresh_Token
        }
    });

    if (!refreshToken) {
        throw new Error("Refresh token inválido!");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    const token = GenerateTokenProvider(refreshToken.userId);

    if (refreshTokenExpired) {
        await client.refreshToken.deleteMany({
            where: {
                userId: refreshToken.userId
            }
        });

        const newRefreshToken = await GenerateRefreshToken(refreshToken.userId);

        return { token, refresh_token: newRefreshToken }
    }

    return { token }
}