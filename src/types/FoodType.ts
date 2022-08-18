export type FoodType = {
    type: string;
    typeFood?: string[];
    name: string;
    ownerName: string;
    image?: string;
    businessPermit?: string;
    number?: string;
    phone?: string;
    whatsapp?: string;
    hourOpen?: string;
    hourClosed?: string;
    delivery?: boolean;
    website?: string;
    facebook?: string;
    instagram?: string;
    othersSocialMedia?: string[];
    acceptReservation?: boolean;
    acceptOrders?: boolean;
    reference?: string;
    mainCourse?: string;
    driversRate: number;
    latitude?: string;
    longitude?: string;
    acceptPets?: boolean;
    bestFood?: boolean;
    registrationStatus?: string;
    observations?: string;
}