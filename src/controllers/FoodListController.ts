import { FoodListService, FoodService } from "../services";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";
import { convertStringToNumber } from "../helpers/convertStringToNumber";
import { resizeAndReturnImage } from "../helpers/imageManipulate";
import { Request, Response } from "express";
import { unlink } from "fs/promises";

export const Create = async (req: Request, res: Response) => {
    let imageName = "";
    if(req.file) {
        imageName = await resizeAndReturnImage(req.file, "foodlist");
    }

    const foodName = req.body.foodName;
    const deliveryTime = req.body.deliveryTime;
    const pricePerServing = convertStringToNumber(req.body.pricePerServing);
    const description = req.body.description;
    const status = convertStringToBoolean(req.body.status);
    const foodId = req.body.foodId;

    const foodExists = await FoodService.getOne(foodId);
    if(foodExists) {
        
        try {

            const savedFoodItem = await FoodListService.create({
                foodId,
                foodName,
                deliveryTime,
                image: imageName !== "" ? imageName : "cover.jpg",
                pricePerServing,
                description,
                status
            });

            res.status(201).json(savedFoodItem);

        } catch(err) {
            if(req.file) {
                await unlink(req.file.path);
            }
            res.status(400).json({
                error: true,
                message: "An error has occurred",
                realError: err
            });
        }

    } else {
        if(req.file) {
            await unlink(req.file.path);
        }
        res.status(400).json({
            error: true,
            message: "Food not send or not found!",
        });
    }
}