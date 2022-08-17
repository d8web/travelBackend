export type UserType = {
    name: string;
    type?: string;
    email: string;
    password: string;
    birthdate?: Date;
    address?: string;
    contactNumber?: string;
    city?: string;
    work?: string;
    avatar?: string;
    cover?: string;
    paid?: boolean;
    tokenPaid?: string;
    usedTheMap?: number;
    status?: boolean;
    whereAreYouStaying?: string;
    roomNumber?: number;
    deliveryNote?: string;
}