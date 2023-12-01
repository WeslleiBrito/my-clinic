import { BaseDatabase } from "../../src/database/BaseDatabase";
import { OccupationalRiskFormsDB } from "../../src/types/types";

const occupationalRiskFormsMock: OccupationalRiskFormsDB[] = [
    {
        id: "idOccupationalRiskForm001",
        id_form: "idForm001",
        id_risk: "occupational001",
        name_risk: "Fisico"
    },
    {
        id: "idOccupationalRiskForm002",
        id_form: "idForm002",
        id_risk: "occupational002",
        name_risk: "Ruído"
    },
    {
        id: "idOccupationalRiskForm003",
        id_form: "idForm002",
        id_risk: "occupational003",
        name_risk: "Poeira"
    },
    {
        id: "idOccupationalRiskForm004",
        id_form: "idForm003",
        id_risk: "occupational003",
        name_risk: "Poeira"
    },

]


export class OccupationalRiskFormsDatabaseMock extends BaseDatabase {

    public static OCCUPATIONAL_RISK_FORMS = "occupational_risk_forms"

    public findOccupationalRiskFormsBy = async (collumn: "id" | "id_form" | "id_risk" | "name_risk", values: string[]): Promise<OccupationalRiskFormsDB[]> => {
        
        const groupValues = new Set(values) 

        const result = occupationalRiskFormsMock.filter((element) => groupValues.has(element[collumn]))

        return result
    }

    public findAllOccupationalRiskForms = async (): Promise<OccupationalRiskFormsDB[]> => {
        
        const result: OccupationalRiskFormsDB[] = occupationalRiskFormsMock

        return result
    }

    public createOccupationalRiskForms = async (input: OccupationalRiskFormsDB[]): Promise<void> => {}

    public editOccupationalRiskForms = async (input: OccupationalRiskFormsDB): Promise<void> => {}

    public deleteOccupationalRiskForms  = async (idForm: string, idRisk: string[]): Promise<void> => {}
}