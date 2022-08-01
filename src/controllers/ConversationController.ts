import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/ensureAuthenticated";
import * as UserService from "../services/userService";
import * as ConversationService from "../services/conversationService";

export const Create = async (req: Request, res: Response) => {

    const { receiverId } = req.body;
    if(receiverId) {

        const userId = (req as CustomRequest).user as string;
        const receiverExists = await UserService.getOneUserById(receiverId);

        if(receiverExists) {

            try {
                const savedConversation = await ConversationService.create(userId, receiverExists.id);
                res.status(201).json(savedConversation);
            } catch(err) {
                res.status(400).json({
                    error: true,
                    message: "Ocorreu um erro!",
                    realError: err
                });
            }

        }

    } else {
        res.status(400).json({
            error: true,
            message: "ReceivedId not found or not sending!"
        });
    }

}

// Get the list conversation from user logged
export const FindConversation = async (req: Request, res: Response) => {
    const id = (req as CustomRequest).user as string;
    const userExists = await UserService.getOneUserById(id);

    if(userExists) {
        try {
            const conversations = await ConversationService.getConversationsById(userExists.id);
            res.status(200).json(conversations);
        } catch(err) {
            res.status(400).json({
                error: true,
                message: "Ocorreu um erro!",
                realError: err
            });
        }
    } else {
        res.status(400).json({
            error: true,
            message: "Id not sending or not found!"
        });
    }
}

// Get the unique conversation
export const FindByTwoUsers = async (req: Request, res: Response) => {

    const { id } = req.params;
    const userLogged = (req as CustomRequest).user as string;

    if(id) {

        const userExists = await UserService.getOneUserById(id);
        if(userExists) {
            try {
                const conversation = await ConversationService.getOneConversationByMembers(userLogged, id);
                if(conversation) {
                    res.status(200).json(conversation);
                } else {
                    res.status(400).json({
                        error: true,
                        message: "Id not sending or not found!"
                    });
                }
            } catch(err) {
                res.status(400).json({
                    error: true,
                    message: "Ocorreu um erro!",
                    realError: err
                });
            }
        }

    } else {
        res.status(400).json({
            error: true,
            message: "Id not sending or not found!"
        });
    }

}