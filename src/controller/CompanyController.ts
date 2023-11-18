import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CompaniesBusiness } from "../business/CompaniesBusiness";
import { InputCreateCompanySchema, OutputCreateCompanyDTO } from "../dtos/company/InputCreateCompany";
import { InputEditCompanySchema, OutputEditCompanyDTO } from "../dtos/company/InputEditCompany";
import { CompanyModel } from "../types/types";

export class CompaniesController {

    constructor(
        private companiesBuisness: CompaniesBusiness
    ){}

    public createCompany = async (req: Request, res: Response) => {

        try {
            
            const { name, cnpj } = req.body

            const input = InputCreateCompanySchema.parse(
                {
                    name,
                    cnpj
                }
            )

            const output: OutputCreateCompanyDTO= await this.companiesBuisness.createCompany(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
                console.log(error);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }


    public editCompany = async (req: Request, res: Response) => {

        try {
            
            const { name, cnpj } = req.body

            const input = InputEditCompanySchema.parse(
                {
                    id: req.params.id,
                    name,
                    cnpj
                }
            )

            const output: OutputEditCompanyDTO = await this.companiesBuisness.editCompany(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
                console.log(error);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public getCompany = async (req: Request, res: Response) => {

        try {
            
            const output: CompanyModel[] = await this.companiesBuisness.getCompany()

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
                console.log(error);
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }
    
}