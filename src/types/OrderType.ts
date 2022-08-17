export type OrderType = {
    orderCode: string;
    customerId: string;
    orderDateTime: Date;
    foodId: string;
    restaurantId: string;
    amount: number;
    deliveryCharge: number;
    totalAmount: number;
    driverId?: string;
    status?: number;
    processedBy: number;
}