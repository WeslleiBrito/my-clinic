import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { OccupationalRiskBusiness } from "../business/OccupationalRiskBusiness";
import { InputCreateOccupationalRiskSchema, OutputCreateOccupationalRiskDTO } from "../dtos/occupationalRisk/InputCreateOccupationalRisk.dto";
import { InputEditInputEditOccupationalRiskSchema, OutputEditOccupationalRiskDTO } from "../dtos/occupationalRisk/InputEditOccupationalRisk.dto";
import { InputDeleteOccupationalRiskSchema, OutputDeleteOccupationalRiskDTO } from "../dtos/occupationalRisk/InputDeleteOccupationalRisk.dto";

export class OccupationalRiskController {

    constructor(
        private OccupationalRiskBuisness: OccupationalRiskBusiness
    ){}

    public createOccupationalRisk = async (req: Request, res: Response) => {

        try {
            
            const { occupationalRisk } = req.body

            const input = InputCreateOccupationalRiskSchema.parse(
                {
                    occupationalRisk
                }
            )

            const output: OutputCreateOccupationalRiskDTO = await this.OccupationalRiskBuisness.createOccupationalRisk(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public editOccupationalRisk = async (req: Request, res: Response) => {

        try {
            
            const { name } = req.body

            const input = InputEditInputEditOccupationalRiskSchema.parse(
                {
                    id: req.params.id,
                    name
                }
            )

            const output: OutputEditOccupationalRiskDTO = await this.OccupationalRiskBuisness.editOccupationalRisk(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }

    }

    public getAllOccupationalRisk = async (req: Request, res: Response) => {

        try {
    
            const output = await this.OccupationalRiskBuisness.getAllOccupationalRisk()

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
            }
        }

    }
    
    public deleteOccupationalRisk = async (req: Request, res: Response) => {

        try {
            
        
            const input = InputDeleteOccupationalRiskSchema.parse(
                {
                    id: req.params.id
                }
            )

            const output: OutputDeleteOccupationalRiskDTO = await this.OccupationalRiskBuisness.deleteOccupationalRisk(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }
}