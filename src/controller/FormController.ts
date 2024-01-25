import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { FormBusiness } from "../business/FormBusiness";
import { InputCreateFormSchema, OutputCreateFormDTO } from '../dtos/Form/InputCreateForm.dto';
import { InputEditFormSchema, OutputEditFormDTO } from '../dtos/Form/InputEditForm.dto';
import { InputDeleteFormSchema } from "../dtos/Form/InputDeleteForm.dto";

export class FormController {

    constructor(
        private formBuisness: FormBusiness
    ){}

    public createForm = async (req: Request, res: Response) => {

        try {
            
            const { idCompany, idPatient, idExams, idTypeExamAso, functionPatient, status, idOccupationalHazards, comments } = req.body

            const input = InputCreateFormSchema.parse(
                {
                    idCompany,
                    idPatient,
                    idExams,
                    idTypeExamAso,
                    functionPatient,
                    status,
                    idOccupationalHazards,
                    comments
                }
            )

            const output: OutputCreateFormDTO = await this.formBuisness.createForm(input)

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

    public editForm = async (req: Request, res: Response) => {

        try {
            
            const {
                    idCompany,
                    idPatient,
                    cnpj,
                    cpf,
                    idExams,
                    idOccupationalHazards,
                    functionPatient,
                    comments,
                    idTypeExamAso,
                    status
                } = req.body

            const input = InputEditFormSchema.parse(
                {
                    id: req.params.id,
                    idCompany,
                    idPatient,
                    cnpj,
                    cpf,
                    idExams,
                    idOccupationalHazards,
                    functionPatient,
                    comments,
                    idTypeExamAso,
                    status
                }
            )

            const output: OutputEditFormDTO = await this.formBuisness.editForm(input)

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

    public getAllForm = async (req: Request, res: Response) => {

        try {
    
            const output = await this.formBuisness.getAllForms()

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

    public deleteForm = async (req: Request, res: Response) => {

        try {
            
            const input = InputDeleteFormSchema.parse(
                {
                    id: req.params.id
                }
            )

            const output = await this.formBuisness.deleteForm(input)

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
    
    
}