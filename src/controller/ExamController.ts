import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputCreateExamSchema, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam.dto";
import { ExamsBusiness } from "../business/ExamsBusiness";
import { InputEditExamSchema, OutputEditExamDTO } from "../dtos/exam/InputEditExam.dto";

export class ExamsController {

    constructor(
        private examsBuisness: ExamsBusiness
    ){}

    public createExam = async (req: Request, res: Response) => {

        try {
            
            const { exams } = req.body

            const input = InputCreateExamSchema.parse(
                {
                    exams
                }
            )

            const output: OutputCreateExamDTO = await this.examsBuisness.createExam(input)

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


    public editExam = async (req: Request, res: Response) => {

        try {
            
            const { name, price } = req.body

            const input = InputEditExamSchema.parse(
                {
                    id: req.params.id,
                    name,
                    price
                }
            )

            const output: OutputEditExamDTO = await this.examsBuisness.editExam(input)

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