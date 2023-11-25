import { ExamsDB } from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'


const ExamsMock: ExamsDB[] = [
    {
        created_at: new Date().toISOString(),
        id: "idExam001",
        name: "Glicose",
        price: 0,
        updated_at: new Date().toISOString()
    },
    {
        created_at: new Date().toISOString(),
        id: "idExam002",
        name: "Espirometria",
        price: 0,
        updated_at: new Date().toISOString()
    },
    {
        created_at: new Date().toISOString(),
        id: "idExam003",
        name: "Avaliação clínica",
        price: 0,
        updated_at: new Date().toISOString()
    }
]

export class ExamsDatabaseMock extends BaseDatabase {

    public static TABLE_EXAMS = "exams"

    public findExamBy = async (collumn: "name" | "id", values: string[]): Promise<ExamsDB[]> => {
        
        const result: ExamsDB[] = []

        values.forEach((value) => {
            const search = ExamsMock.find((exam) => exam[collumn] === value)

            if(search){
                result.push(
                    {
                        created_at: search.created_at,
                        id: search.id,
                        name: search.name,
                        price: search.price,
                        updated_at: search.updated_at
                    }
                )
            }
        })

        return result
    }

    public findExamAll = async (): Promise<ExamsDB[]> => {

        return ExamsMock
    }
    
    public createExam = async (input: ExamsDB[]): Promise<void> => {}

    public editExam = async (input: ExamsDB): Promise<void> => {}
}