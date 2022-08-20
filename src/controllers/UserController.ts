import {
    UserService,
    UserRelationService,
    AttractiveService,
    FavoriteService
} from "../services/index";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/ensureAuthenticated";
import dotenv from "dotenv";

dotenv.config();

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
        const relation = await UserRelationService.verifyRelation(loggedUserId, req.params.id);
        if(relation) {
            // Delete relation [Unfollow]
            await UserRelationService.deleteRelation(relation.id);
        } else {
            // Insert relation [Follow]
            await UserRelationService.insertRelation(loggedUserId, req.params.id);
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

// Get a followers from user
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

        const followers = await UserRelationService.getFollowers(id);
        const following = await UserRelationService.getFollowing(id);

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

// Toogle user favorite
export const ToogleFavorite = async (req: Request, res: Response) => {
    const { idAttractive } = req.body;

    if(idAttractive) {

        const attractiveExists = await AttractiveService.getOneAttractive(idAttractive);
        if(attractiveExists) {

            const userId = (req as CustomRequest).user as string;
            const favoritedIsExists = await FavoriteService.isFavorited(idAttractive, userId);

            const result = {
                isFavorited: false
            }

            if(favoritedIsExists) {
                await FavoriteService.deleteFavorited(favoritedIsExists.id);
            } else {
                await FavoriteService.createFavorited(attractiveExists.id, userId);
                result.isFavorited = true;
            }

            res.status(200).json(result);
        }

    } else {
        res.status(400).json({
            error: true,
            message: "Id attractive not found or not send!"
        });
    }
}

// Get the list of user favorites
export const AllFavorites = async (req: Request, res: Response) => {
    const result = [];

    const userId = (req as CustomRequest).user as string;
    const favorites = await FavoriteService.getFavorites(userId);

    for(let i in favorites) {
        let attractive = await AttractiveService.getOneAttractive(favorites[i].idAttractive);
        result.push(attractive);
    }

    res.status(200).json(result);
}