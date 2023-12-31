import { ExamsDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class ExamsDatabase extends BaseDatabase {

    public static TABLE_EXAMS = "exams"

    public findExamBy = async (collumn: "id" | "name", values: string[]): Promise<ExamsDB[]> => {
        
        const result: ExamsDB[] = await ExamsDatabase.connection(ExamsDatabase.TABLE_EXAMS).whereIn(collumn, values)

        return result
    }

    public findExamAll = async (): Promise<ExamsDB[]> => {
        
        const result: ExamsDB[] = await ExamsDatabase.connection(ExamsDatabase.TABLE_EXAMS)

        return result
    }

    public createExam = async (input: ExamsDB[]): Promise<void> => {
        
        await ExamsDatabase.connection(ExamsDatabase.TABLE_EXAMS).insert(input)

    }


    public editExam = async (input: ExamsDB): Promise<void> => {
        
        const {id, name, price, updated_at} = input

        await ExamsDatabase.connection(ExamsDatabase.TABLE_EXAMS).update({name, price, updated_at}).where({id})
    }

    public deleteExam = async (id: string): Promise<void> => {

        await ExamsDatabase.connection(ExamsDatabase.TABLE_EXAMS).del().where({id})

    } 
}