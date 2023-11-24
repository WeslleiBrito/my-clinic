import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { FormBusiness } from "../business/FormBusiness";
import { InputCreateFormSchema, OutputCreateFormDTO } from "../dtos/form/InputCreateForm.dto";
import { InputEditFormSchema, OutputEditFormDTO } from "../dtos/form/InputEditForm.dto";

export class FormController {

    constructor(
        private formBuisness: FormBusiness
    ){}

    public createForm = async (req: Request, res: Response) => {

        try {
            
            const { idCompany, idPatient, idExams } = req.body

            const input = InputCreateFormSchema.parse(
                {
                    idCompany,
                    idPatient,
                    idExams
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
                    idExams} = req.body

            const input = InputEditFormSchema.parse(
                {
                    id: req.params.id,
                    idCompany,
                    idPatient,
                    cnpj,
                    cpf,
                    idExams
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
    
    
}