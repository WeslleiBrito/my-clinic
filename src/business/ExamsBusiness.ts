import { ExamsDatabase } from "../database/ExamsDatabase";
import { InputCreateExamDTO, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam.dto";
import { InputEditExamDTO, OutputEditExamDTO } from "../dtos/exam/InputEditExam.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Exam } from "../models/Exam";
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

    public editExam = async (input: InputEditExamDTO): Promise<OutputEditExamDTO> => {
        
        const {id, name, price} = input 

        const exam = await this.examsDatabase.findExamBy('id', [id])

        if(exam.length < 1){
            throw new NotFoundError('O id informado não existe.')
        }

        if(name){
            const nameExist = await this.examsDatabase.findExamBy('name', [name])

            if(nameExist.length > 0){
                if(nameExist[0].id !== id){
                    throw new ConflictError('O nome informado já existe.')
                }
            }
        }


        const newExam = new Exam(
            id,
            name || exam[0].name,
            typeof price !== "undefined" ? price : exam[0].price,
            exam[0].created_at,
            new Date().toISOString()
        )

        await this.examsDatabase.editExam({
            created_at: newExam.getCreatedAt(),
            id: newExam.getId(),
            name: newExam.getName(),
            price: newExam.getPrice(),
            updated_at: newExam.getUpdatedAt()
        })

        return {
            message: "Exame atualizado com sucesso!"
        }
    }


    public getAllExam = async () => {

        const search = await this.examsDatabase.findExamAll()

        const result = search.map((exam) => {

            return {
                id: exam.id,
                name: exam.name,
                price: exam.price,
                createdAt: exam.created_at,
                updatedAt: exam.updated_at
            }
        })

        return result
    } 
}