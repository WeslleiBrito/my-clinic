import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { OccupationalRiskBusiness } from "../business/OccupationalRiskBusiness";
import { InputCreateOccupationalRiskSchema, OutputCreateOccupationalRiskDTO } from "../dtos/occupationalRisk/InputCreateOccupationalRisk.dto";
import { InputEditOccupationalRiskSchema, OutputEditOccupationalRiskDTO } from "../dtos/occupationalRisk/InputEditOccupationalRisk.dto";
import { InputDeleteOccupationalRiskSchema, OutputDeleteOccupationalRiskDTO } from "../dtos/occupationalRisk/InputDeleteOccupationalRisk.dto";
import { TypeExamAsoBusiness } from "../business/TypeExamAsoBusiness";
import { InputCreateTypeExamAsoSchema, OutputCreateTypeExamAsoDTO } from "../dtos/TypeExamAso/InputCreateTypeExamAso.dto";
import { InputEditTypeExamAsoSchema, OutputEditTypeExamAsoDTO } from "../dtos/TypeExamAso/InputEditTypeExamAso.dto";
import { InputDeleteTypeExamAsoSchema, OutputDeleteTypeExamAsoDTO } from "../dtos/TypeExamAso/InputDeleteTypeExamAso.dto";

export class TypeExamAsoController {

    constructor(
        private TypeExamAsoBuisness: TypeExamAsoBusiness
    ){}

    public createTypeExamAso = async (req: Request, res: Response) => {

        try {
            
            const { typeExams } = req.body

            const input = InputCreateTypeExamAsoSchema.parse(
                {
                    typeExams
                }
            )

            const output: OutputCreateTypeExamAsoDTO = await this.TypeExamAsoBuisness.createTypeExamAso(input)

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

    public editTypeExamAso = async (req: Request, res: Response) => {

        try {
            
            const { name } = req.body

            const input = InputEditTypeExamAsoSchema.parse(
                {
                    id: req.params.id,
                    name
                }
            )

            const output: OutputEditTypeExamAsoDTO = await this.TypeExamAsoBuisness.editTypeExamAso(input)

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

    public getAllTypeExamAso = async (req: Request, res: Response) => {

        try {
    
            const output = await this.TypeExamAsoBuisness.getAllTypeExamAso()

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
    
    public deleteTypeExamAso = async (req: Request, res: Response) => {

        try {
            
        
            const input = InputDeleteTypeExamAsoSchema.parse(
                {
                    id: req.params.id
                }
            )

            const output: OutputDeleteTypeExamAsoDTO = await this.TypeExamAsoBuisness.deleteTypeExamAso(input)

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