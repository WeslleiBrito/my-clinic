import { TypeExameAsoDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class TypeExamAsoDatabase extends BaseDatabase {

    public static TYPE_EXAMS_ASO = "type_exams_aso"

    public findTypeExamAsoBy = async (collumn: "name" | "id", values: string[]): Promise<TypeExameAsoDB[]> => {
        
        const result: TypeExameAsoDB[] = await TypeExamAsoDatabase.connection(TypeExamAsoDatabase.TYPE_EXAMS_ASO).whereIn(collumn, values)

        return result
    }

    public findAllTypeExamsAso = async (): Promise<TypeExameAsoDB[]> => {
        
        const result: TypeExameAsoDB[] = await TypeExamAsoDatabase.connection(TypeExamAsoDatabase.TYPE_EXAMS_ASO)

        return result
    }

    public createTypeExamAso = async (input: TypeExameAsoDB[]): Promise<void> => {
        
        await TypeExamAsoDatabase.connection(TypeExamAsoDatabase.TYPE_EXAMS_ASO).insert(input)

    }


    public editTypeExamAso = async (input: TypeExameAsoDB): Promise<void> => {
        
        const {id, name, updated_at} = input

        await TypeExamAsoDatabase.connection(TypeExamAsoDatabase.TYPE_EXAMS_ASO).update({name, updated_at}).where({id})
    }

    public deleteTypeExamAso = async (id: string): Promise<void> => {

        await TypeExamAsoDatabase.connection(TypeExamAsoDatabase.TYPE_EXAMS_ASO).del().where({id})
        
    }
}