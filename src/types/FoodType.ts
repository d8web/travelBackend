export interface FoodType {
    type: string;
    name: string;
    image?: string;
    phone?: string;
    whatsapp?: string;
    hourOpen?: string;
    hourClosed?: string;
    delivery?: boolean;
    menu?: string[];
    website?: string;
    facebook?: string;
    instagram?: string;
    othersSocialMedia?: string[];
    acceptReservation?: boolean;
    acceptOrders?: boolean;
    acceptPets?: boolean;
    reference?: string;
    bestfood?: boolean;
    observations?: string;
}