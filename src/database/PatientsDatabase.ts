import { PatientDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class PatientDatabase extends BaseDatabase {

    public static TABLE_PATIENTS = "patients"

    public createPatient = async (input: PatientDB): Promise<void> => {

        await PatientDatabase.connection(PatientDatabase.TABLE_PATIENTS).insert({
            id: input.id,
            name: input.name,
            rg: input.rg,
            cpf: input.cpf ? input.cpf : null,
            created_at: input.created_at,
            updated_at: input.updated_at
        })
    }   


    public findPatientBy = async (collumn: 'rg' | 'cpf' | 'id' | 'name', value: string): Promise<PatientDB | undefined> => {

        const [result]: PatientDB[] | undefined = await PatientDatabase.connection(PatientDatabase.TABLE_PATIENTS).where({[collumn]: value})
        
        return result
    }
   

    public findPatientAll = async (): Promise<PatientDB[]> => {

        const result: PatientDB[] = await PatientDatabase.connection(PatientDatabase.TABLE_PATIENTS)
        
        return result
    }

    public editPatient = async (input: PatientDB): Promise<void> => {

        await PatientDatabase.connection(PatientDatabase.TABLE_PATIENTS).update(
            {
                name: input.name,
                rg: input.rg,
                cpf: input.cpf ? input.cpf : null,
                updated_at: input.updated_at
            }
        ).where({id: input.id})
    }
   
    
}

