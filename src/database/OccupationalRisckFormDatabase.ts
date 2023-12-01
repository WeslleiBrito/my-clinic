import { OccupationalRiskFormsDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class OccupationalRiskFormsDatabase extends BaseDatabase {

    public static OCCUPATIONAL_RISK_FORMS = "occupational_risk_forms"

    public findOccupationalRiskFormsBy = async (collumn: "id" | "id_form" | "id_risk" | "name_risk", values: string[]): Promise<OccupationalRiskFormsDB[]> => {
        
        const result: OccupationalRiskFormsDB[] = await OccupationalRiskFormsDatabase.connection(OccupationalRiskFormsDatabase.OCCUPATIONAL_RISK_FORMS).whereIn(collumn, values)

        return result
    }

    public findAllOccupationalRiskForms = async (): Promise<OccupationalRiskFormsDB[]> => {
        
        const result: OccupationalRiskFormsDB[] = await OccupationalRiskFormsDatabase.connection(OccupationalRiskFormsDatabase.OCCUPATIONAL_RISK_FORMS)

        return result
    }

    public createOccupationalRiskForms = async (input: OccupationalRiskFormsDB[]): Promise<void> => {

        await OccupationalRiskFormsDatabase.connection(OccupationalRiskFormsDatabase.OCCUPATIONAL_RISK_FORMS).insert(input)

    }

    public editOccupationalRiskForms = async (input: OccupationalRiskFormsDB): Promise<void> => {
        
        const {id, id_form, id_risk, name_risk} = input

        await OccupationalRiskFormsDatabase.connection(OccupationalRiskFormsDatabase.OCCUPATIONAL_RISK_FORMS).update(
            {
                id_risk,
                id_form,
                name_risk
            }
        ).where({id})
    }

    public deleteOccupationalRiskForms  = async (idForm: string, idRisk: string[]): Promise<void> => {
        
        for (const id of idRisk){

            await OccupationalRiskFormsDatabase.connection(OccupationalRiskFormsDatabase.OCCUPATIONAL_RISK_FORMS).del().where({id_risk: id}).andWhere({id_form: idForm})

        }
    }
}