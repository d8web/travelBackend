import { authenticate, create } from "../services/authService";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/ensureAuthenticated";
import * as UserService from "../services/userService";
import * as UserRelation from "../services/userRelation";
import dotenv from "dotenv";

dotenv.config();

export const AuthUser = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const token = await authenticate({ username, password });
    response.json(token);
}

export const Create = async (request: Request, response: Response) => {
    const { username, name, password } = request.body;

    const user = await create({
        name,
        username,
        password
    });

    response.json(user);
}

export const Follow = async (req: Request, res: Response) => {

    const loggedUserId = (req as CustomRequest).user as string;

    if(req.params.id === loggedUserId) {
        return res.status(400).json({
            error: true,
            message: "You can't follow yourself"
        });
    }

    const userExists = await UserService.getOneUserById(req.params.id);
    if(userExists) {
        
        const result = { isFollowing: false }
        const relation = await UserRelation.verifyRelation(loggedUserId, req.params.id);
        if(relation) {
            // Delete relation [Unfollow]
            await UserRelation.deleteRelation(relation.id);
        } else {
            // Insert relation [Follow]
            await UserRelation.insertRelation(loggedUserId, req.params.id);
            result.isFollowing = true;
        }

        res.status(200).json(result);

    } else {
        res.json({
            error: true,
            message: "User does not exists!"
        });
    }

}

export const Followers = async (req: Request, res: Response) => {

    const id = req.params.id;
    const userExists = await UserService.getOneUserById(id);

    if(userExists) {

        interface User {
            id: string;
            name: string;
            avatar: string;
        }

        interface Result {
            followers: User[],
            following: User[]
        }

        const result: Result = {
            followers: [],
            following: []
        }

        const followers = await UserRelation.getFollowers(id);
        const following = await UserRelation.getFollowing(id);

        for(let i in followers) {
            const user = await UserService.getOneUserById(followers[i].userFrom);

            result.followers.push({
                id: user.id,
                name: user.name,
                avatar: `${process.env.BASE_URL}/media/images/users/avatars/${user.avatar}`
            });
        }

        for(let i in following) {
            const user = await UserService.getOneUserById(following[i].userFrom);

            result.following.push({
                id: user.id,
                name: user.name,
                avatar: `${process.env.BASE_URL}/media/images/users/avatars/${user.avatar}`
            });
        }

        res.status(200).json(result);

    } else {
        res.status(400).json({
            error: true,
            message: "User does not exists!"
        });
    }

}