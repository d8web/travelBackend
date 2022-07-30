import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/ensureAuthenticated";
import validator from "../helpers/validator";
import * as FeedService from "../services/feedService";
import * as UserRelation from "../services/userRelation";
import * as PostService from "../services/postService";

export const createPost = async (req: Request, res: Response) => {

    // const authorId = res.locals.user;
    const type = req.body.type;
    const body = req.body.body;
    const user = (req as CustomRequest).user;

    const data = {
        type,
        authorId: user as string,
        body: "",
    }

    switch(type) {
        case "text":
            data.body = body;
            return res.status(201).json(await FeedService.createPost(data));
        break;
        case "photo":
            const imageName: string = await resizeAndReturnImage(req.file, "posts");
            data.body = imageName;
            return res.status(201).json(await FeedService.createPost(data));
        break;
        case "video":

            const validationRule = {
                "body": "required|url"
            };

            await validator(req.body, validationRule, {}, async (err, status) => {
                if(!status) {
                    res.status(412)
                        .json({
                            success: false,
                            data: err.errors
                        });
                } else {
                    data.body = body;
                    const savedUser = await FeedService.createPost(data);
                    return res.status(201).json(savedUser);
                }
            }).catch(err => 
                res.status(400).json({ error: true, message: "Ocorreu um erro!", realMessage: err })
            );

        break;
    }
}

export const allPosts = async (req: Request, res: Response) => {
    const users: string[] = [];
    const user = (req as CustomRequest).user;

    const usersList = await UserRelation.getRelationsFromUser(user as string);
    if(usersList.length > 0) {
        for(let i in usersList) {
            users.push(usersList[i].id);
        }
    }

    users.push(user as string);

    const posts = await PostService.getPostsFromUser(users);
    res.status(200).json(posts);
}