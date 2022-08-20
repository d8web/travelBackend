import { sign } from "jsonwebtoken";

// Gerar um token para o usuário
export const GenerateTokenProvider = (userId: string) => {
    const token = sign({}, "954b8d2a-fb9d-4be4-a664-5380431c8654", {
        subject: userId,
        expiresIn: "7200s" // 2hrs
    });

    return token;
}