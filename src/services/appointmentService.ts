import { client } from "../prisma/client";
import { AppointmentType } from "../types/AppointmentType";

export const createAppoinyment = async (data: AppointmentType) => {
    return await client.userAppointment.create({
        data: {
            idAgency: data.idAgency,
            idUser: data.idUser,
            idService: data.idService,
            numberOfPeoples: data.numberOfPeoples,
            appointmentDatetime: data.appointmentDatetime
        }
    });
}