import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { InputCreateExamSchema, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam";
import { ExamsBusiness } from "../business/ExamsBusiness";

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
    
}