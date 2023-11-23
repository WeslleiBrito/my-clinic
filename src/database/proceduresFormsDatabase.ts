import { FormDB, ProceduresFormsDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class ProceduresFormsDatabase extends BaseDatabase {

    public static TABLE_PROCEDURES_FORMS = "procedures_forms"

    public findProceduresFormsBy = async (collumn: "name" | "id" | "id_form", values: string[]): Promise<ProceduresFormsDB[]> => {
        
        const result: ProceduresFormsDB[] = await ProceduresFormsDatabase.connection(ProceduresFormsDatabase.TABLE_PROCEDURES_FORMS).whereIn(collumn, values)

        return result
    }

    public findAllProceduresForms = async (): Promise<ProceduresFormsDB[]> => {
        
        const result: ProceduresFormsDB[] = await ProceduresFormsDatabase.connection(ProceduresFormsDatabase.TABLE_PROCEDURES_FORMS)

        return result
    }

    public createProceduresForms = async (input: ProceduresFormsDB): Promise<void> => {

        await ProceduresFormsDatabase.connection(ProceduresFormsDatabase.TABLE_PROCEDURES_FORMS).insert(input)

    }

    public editProceduresForms = async (input: ProceduresFormsDB): Promise<void> => {
        
        const {id, id_exam, id_form, name_exam} = input

        await ProceduresFormsDatabase.connection(ProceduresFormsDatabase.TABLE_PROCEDURES_FORMS).update(
            {
                id_exam,
                id_form,
                name_exam
            }
        ).where({id})
    }

    public deleteProceduresForms  = async (id: string[]): Promise<void> => {
        
        await ProceduresFormsDatabase.connection(ProceduresFormsDatabase.TABLE_PROCEDURES_FORMS).del().whereIn('id', id)
    }
}