import { ExamsDatabase } from "../database/ExamsDatabase";
import { InputCreateExamDTO, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam";
import { ConflictError } from "../errors/ConflictError";
import { IdGenerator } from "../services/IdGenerator";
import { ExamsDB } from "../types/types";


export class ExamsBusiness {

    constructor(
        private examsDatabase: ExamsDatabase,
        private idGenerator: IdGenerator
    ){}


    public createExam = async (input: InputCreateExamDTO): Promise<OutputCreateExamDTO> => {

        const {exams} = input

        const nameExist = await this.examsDatabase.findExamBy('name', exams.map((exam) => exam.name))

        if(nameExist.length > 0){
            throw new ConflictError('Existe algum exame com nome duplicado em relação ao banco de dados.')
        }

        const date = new Date().toISOString()

        const examsDB: ExamsDB[] = exams.map((exam) => {

            return {
                created_at: date,
                id: this.idGenerator.generate(),
                name: exam.name,
                price: exam.price ? exam.price : 0,
                updated_at: date
            }
        })

        await this.examsDatabase.createExam(examsDB)

        return{
            message: exams.length > 1 ? "Exames criados com sucesso!" : "Exame criado com sucesso!"
        }
    }
}