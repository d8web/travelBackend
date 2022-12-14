export interface TourType {
    id?: string;
    idAgency: string;
    attractives: string[],
    name: string;
    meansOfLocomotion: string;
    guidesOnVehicleClient?: boolean;
    background?: string;
    video?: string;
    groups: boolean;
    duration: string;
    pricePerPeople: number;
    specialPrice: number;
    descriptionTour: string;
    whatsToTake: string;
    hasWalk: boolean;
    observations: string;
}