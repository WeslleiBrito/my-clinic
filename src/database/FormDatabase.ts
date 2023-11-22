import { FormDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class FormDatabase extends BaseDatabase {

    public static TABLE_FORMS = "forms"

    public findFormBy = async (collumn: "name" | "id", values: string[]): Promise<FormDB[]> => {
        
        const result: FormDB[] = await FormDatabase.connection(FormDatabase.TABLE_FORMS).whereIn(collumn, values)

        return result
    }

    public findAllForm = async (): Promise<FormDB[]> => {
        
        const result: FormDB[] = await FormDatabase.connection(FormDatabase.TABLE_FORMS)

        return result
    }

    public createForm = async (input: FormDB): Promise<void> => {

        const {
            amount,
            cnpj,
            cpf,
            created_at,
            id,
            id_company,
            id_patient,
            name_company,
            name_patient,
            number_procedures,
            updated_at
        } = input

        await FormDatabase.connection(FormDatabase.TABLE_FORMS).insert(
            {
                amount,
                cnpj: cnpj ? cnpj : null,
                cpf: cpf ? cpf : null,
                created_at,
                id,
                id_company,
                id_patient,
                name_company,
                name_patient,
                number_procedures,
                updated_at
            }
        )

    }

    public editForm = async (input: FormDB): Promise<void> => {
        
        const {id, updated_at, amount, cnpj, cpf, id_company, id_patient, name_company, name_patient, number_procedures} = input

        await FormDatabase.connection(FormDatabase.TABLE_FORMS).update(
            {
                updated_at,
                amount,
                cnpj,
                cpf,
                id_company,
                id_patient,
                name_company,
                name_patient,
                number_procedures
            }
        ).where({id})
    }
}