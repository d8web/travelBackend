import { UserRequest, AuthRequest } from "../types/AuthType";
import { GenerateTokenProvider } from "../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { hash, compare } from "bcryptjs";
import { client } from "../prisma/client";

export const create = async ({ name, email, password }: UserRequest) => {
    // Verificar se o usuário existe!
    const userAlreadyExists = await client.user.findFirst({
        where: { email }
    });

    if (userAlreadyExists) {
        throw new Error("Usuário já existe!");
    }

    // Cadastrar usuário
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    });

    return user;
}

export const authenticate = async ({ email, password }: AuthRequest) => {
    // Verificar se o usuário existe!
    const userAlreadyExists = await client.user.findFirst({
        where: { email }
    });

    if (!userAlreadyExists) {
        throw new Error("Usuário e/ou senha incorretos!");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
        throw new Error("Usuário e/ou senha incorretos!");
    }

    // Gerar um token para o usuário
    const token = GenerateTokenProvider(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
        where: {
            userId: userAlreadyExists.id
        }
    });
    
    const refreshToken = await GenerateRefreshToken(userAlreadyExists.id);

    return { token, refreshToken };
}