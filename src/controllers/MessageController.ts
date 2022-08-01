import { Request, Response } from "express";
import { getOneUserById } from "../services/userService";
import { conversationExistsById } from "../services/conversationService";
import { insertMessage } from "../services/messageService";

export const createMessage = async (req: Request, res: Response) => {

    const { conversationId, sender, text } = req.body;
    const senderIdExists = await getOneUserById(sender);
    const conversationExists = await conversationExistsById(conversationId);

    if(conversationExists && senderIdExists && text) {
        try {
    
            const savedMessage = await insertMessage(sender, conversationId, text);
            res.status(201).json(savedMessage);
    
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
            message: "Ocorreu um erro!"
        });
    }

}