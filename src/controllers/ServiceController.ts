import { AgencyService, ServiceService } from "../services/index";
import { Request, Response } from "express";

export const Create = async (req: Request, res: Response) => {
    const { idAgency, name, tours, price, duration } = req.body;
    /**
     * Check if the agency id was sent
     * Verificar se o id da agência foi enviado
     */
    if(idAgency) {
        /**
         * Check if the branch exists in the database
         * Verificar se a agência existe no banco de dados
         */
        const agencyExists = await AgencyService.getOneAgency(idAgency);
        if(agencyExists) {
            /**
             * Split tours, as it is necessary to generate an array of attractions ids
             * Passeios divididos, pois é necessário gerar um conjunto de IDs dos atrativos
             */
            const data = { idAgency, name, price, tours, duration };
            /**
             * Trying to save the service for the branch in the bank
             * [Tentar salvar o serviço referente a agência no banco]
             */
            try {
                const savedService = await ServiceService.create(data);
                res.status(201).json(savedService);
            } catch(err) {
                res.status(400).json({
                    error: true,
                    message: "An error has occurred",
                    realError: err
                });
            }
        }

    } else {
        /**
         * Return the error if the agency id is not sent or the agency is not found
         * [Retornar o erro caso não seja enviado o id da agência ou a agência não foi encontrada]
         */
        res.status(400).json({
            error: true,
            message: "Id agency or IdTour not send or not found!"
        });
    }
}

export const GetServicesByAgencyId = async (req: Request, res: Response) => {}