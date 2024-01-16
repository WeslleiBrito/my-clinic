import { FormDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class FormDatabase extends BaseDatabase {

    public static TABLE_FORMS = "forms"

    public findFormBy = async (collumn: "id" | "id_company" | "id_patient" | "id_type_exam", values: string[]): Promise<FormDB[]> => {
        
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
            rg,
            created_at,
            id,
            id_company,
            id_patient,
            name_company,
            name_patient,
            number_procedures,
            updated_at,
            function_patient,
            id_type_exam,
            status_exam,
            comments
        } = input

        await FormDatabase.connection(FormDatabase.TABLE_FORMS).insert(
            {
                amount,
                cnpj: cnpj ? cnpj : "",
                cpf: cpf ? cpf : "",
                rg,
                created_at,
                id,
                id_company,
                id_patient,
                name_company,
                name_patient,
                number_procedures,
                updated_at,
                function_patient,
                status_exam,
                id_type_exam,
                comments
            }
        )

    }

    public editForm = async (input: FormDB): Promise<void> => {
        
        const {id, updated_at, amount, cnpj, cpf, id_company, id_patient, name_company, name_patient, number_procedures, rg, function_patient, id_type_exam, status_exam, comments} = input

        await FormDatabase.connection(FormDatabase.TABLE_FORMS).update(
            {
                updated_at,
                amount,
                cnpj,
                cpf,
                rg,
                id_company,
                id_patient,
                name_company,
                name_patient,
                number_procedures,
                function_patient,
                id_type_exam,
                status_exam,
                comments
            }
        ).where({id})
    }

    public deleteForm = async (idForms: string[]): Promise<void> => {

        for (const id of idForms) {
            await FormDatabase.connection(FormDatabase.TABLE_FORMS).del().where({id})
        }
        
    }
}