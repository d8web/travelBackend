import {
    PostService,
    PostLikeService,
    PostCommentService
} from "../services/index";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/ensureAuthenticated";

// Like a post function
export const Like = async (req: Request, res: Response) => {
    // Verify is post exists
    const post = await PostService.getOnePostById(req.params.id);
    if(post) {

        const result = {
            isLiked: false,
            likeCount: 0
        };

        const isLiked = await PostLikeService.VerifyIsLiked(post.id, (req as CustomRequest).user as string);
        if(isLiked === null) {
            // Like
            await PostLikeService.Like(post.id,(req as CustomRequest).user as string);
            result.isLiked = true;
        } else {
            // Deslike
            await PostLikeService.Deslike(isLiked.id);
            result.isLiked = false;
        }

        result.likeCount = await PostLikeService.countLikesFromPost(post.id);
        return res.status(200).json(result);

    } else {
        res.status(400).json({
            error: true,
            message: "Post not found or not sending id!"
        });
    }
}

// Comment a post
export const Comment = async (req: Request, res: Response) => {
    // Verify is post exists
    const post = await PostService.getOnePostById(req.params.id);
    if(post) {

        const { text } = req.body;
        if(text) {

            const userId = (req as CustomRequest).user as string;
            const savedComment = await PostCommentService.createComment(post.id, userId, text);
            res.status(201).json(savedComment);

        } else {
            res.status(400).json({
                error: true,
                message: "Send a comment."
            });
        }

    } else {
        res.status(400).json({
            error: true,
            message: "Post not found or not sending id!"
        });
    }
}