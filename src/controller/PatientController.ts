import { Request, Response } from "express";
import { PatientBuisness } from "../business/PatientsBusiness";
import { InputPatientSchema, OutputPatientDTO } from "../dtos/patient/InputPatient.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputEditPatientSchema, OutputEditPatientDTO } from "../dtos/patient/InputEditPatient";
import { InputDeletePatientSchema, OutputDeletePatientDTO } from "../dtos/patient/InputDeletePatient.dto";

export class PatientController {

    constructor(
        private patientBuisness: PatientBuisness
    ){}

    public createPatient = async (req: Request, res: Response) => {

        try {
            
            const { name, rg, cpf } = req.body

            const input = InputPatientSchema.parse(
                {
                    name,
                    rg,
                    cpf
                }
            )

            const output: OutputPatientDTO = await this.patientBuisness.createPatient(input)

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

    public editPatient = async (req: Request, res: Response) => {

        try {
            
            const { name, rg, cpf } = req.body

            const input = InputEditPatientSchema.parse(
                {
                    id: req.params.id,
                    name,
                    rg,
                    cpf
                }
            )

            const output: OutputEditPatientDTO = await this.patientBuisness.editPatient(input)

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

    public getPatients = async (req: Request, res: Response) => {

        try {

            const output = await this.patientBuisness.getPatients()

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

    public deletePatient = async (req: Request, res: Response) => {

        try {
            
        
            const input = InputDeletePatientSchema.parse(
                {
                    id: req.params.id
                }
            )

            const output: OutputDeletePatientDTO = await this.patientBuisness.deletePatient(input)

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