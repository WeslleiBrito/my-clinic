import { TypeExameAsoDB } from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'


const TypeExamAsoBaseMock: TypeExameAsoDB[] = [
    {
        created_at: new Date().toISOString(),
        id: "typeExamAso001",
        name: "Admissional",
        updated_at: new Date().toISOString()
    },
    {
        created_at: new Date().toISOString(),
        id: "typeExamAso002",
        name: "Demissional",
        updated_at: new Date().toISOString()
    },
    
]


export class TypeExamAsoDatabaseMock extends BaseDatabase {

    public static OCCUPATIONAL_RISKS = "type_exams_aso"

    public findTypeExamAsoBy = async (collumn: "name" | "id", values: string[]): Promise<TypeExameAsoDB[]> => {
        
        const result: TypeExameAsoDB[] = []

        values.forEach((value) => {
            const search = TypeExamAsoBaseMock.find((Occupational) => Occupational[collumn] === value)

            if(search){

                result.push({
                    created_at: search.created_at,
                    id: search.id,
                    name: search.name,
                    updated_at: search.updated_at
                })
            }
        })

        return result
    }

    public findAllTypeExamsAso = async (): Promise<TypeExameAsoDB[]> => {

        return TypeExamAsoBaseMock
    }

    public createTypeExamAso = async (input: TypeExameAsoDB[]): Promise<void> => {}


    public editTypeExamAso = async (input: TypeExameAsoDB): Promise<void> => {}

    public deleteTypeExamAso = async (id: string): Promise<void> => {}
}