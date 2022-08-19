import { FoodListType } from "../types/FoodListType";
import { client } from "../prisma/client";

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

export const getListByAgencyId = async ( foodId: string ) => {
    return await client.foodList.findMany({ where: { foodId } });
}

export const all = async () => {
    return await client.foodList.findMany();
}