import { client } from "../prisma/client";
import { FoodListType } from "../types/FoodListType";

export const create = async (data: FoodListType) => {
    return await client.foodList.create({
        data: {
            foodId: data.foodId,
            foodName: data.foodName,
            deliveryTime: data.deliveryTime,
            pricePerServing: data.pricePerServing,
            image: data.image !== "" ? data.image : "cover.jpg",
            description: data.description,
            status: data.status
        }
    });
}

export const all = async () => {
    return await client.foodList.findMany();
}