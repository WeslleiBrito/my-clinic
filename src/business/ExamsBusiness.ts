import { ExamsDatabase } from "../database/ExamsDatabase";
import { ProceduresFormsDatabase } from "../database/proceduresFormsDatabase";
import { InputCreateExamDTO, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam.dto";
import { InputDeleteExamDTO, OutputDeleteExamDTO } from "../dtos/exam/InputDeleteExam.dto";
import { InputEditExamDTO, OutputEditExamDTO } from "../dtos/exam/InputEditExam.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Exam } from "../models/Exam";
import { IdGenerator } from "../services/IdGenerator";
import { ExamModel, ExamsDB } from "../types/types";


export class ExamsBusiness {

    constructor(
        private examsDatabase: ExamsDatabase,
        private idGenerator: IdGenerator,
        private proceduresFormsDatabase: ProceduresFormsDatabase
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

        return{ message: exams.length > 1 ? "Exames criados com sucesso!" : "Exame criado com sucesso!"
           
        }
    }

    public editExam = async (input: InputEditExamDTO): Promise<OutputEditExamDTO> => {
        
        const {id, name, price} = input 
        const exams = await this.examsDatabase.findExamAll()

        const exam = exams.find((examTest) => examTest.id === id)

        if(!exam){
            throw new NotFoundError('O id informado não existe.')
        }

        if(name){

            const nameExist = exams.find((examTest) => examTest.name.toLocaleLowerCase() === name.toLocaleLowerCase())

            if(nameExist){
                if(nameExist.id !== id){
                    throw new ConflictError('O nome informado já existe.')
                }
            }
        }


        const newExam = new Exam(
            id,
            name || exam.name,
            typeof price !== "undefined" ? price : exam.price,
            exam.created_at,
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

    public getAllExam = async (): Promise<ExamModel[]> => {

        const search = await this.examsDatabase.findExamAll()

        const result = search.map((exam) => {

            const newExam = new Exam(
                exam.id,
                exam.name,
                exam.price,
                exam.created_at,
                exam.updated_at
            )

            return {
                id: newExam.getId(),
                name: newExam.getName(),
                price: newExam.getPrice(),
                createdAt: newExam.getCreatedAt(),
                updatedAt: newExam.getUpdatedAt()
            }
        })

        return result
    }
    
    public deleteExam = async (input: InputDeleteExamDTO): Promise<OutputDeleteExamDTO> => {

        const [exam] = await this.examsDatabase.findExamBy('id', [input.id])

        if(!exam){
            throw new NotFoundError("Exame não encontrada, verifique o id")
        }

        const [isInteraction] = await this.proceduresFormsDatabase.findProceduresFormsBy('id_exam', [input.id])
        
        if(isInteraction){
            throw new BadRequestError("Não é possível excluir um exame que possui registros ativos.")
        }

        await this.examsDatabase.deleteExam(input.id)

        return {
            message: "Exame deletado com sucesso!"
        }
    }
}