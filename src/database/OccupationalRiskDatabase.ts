import { OccupationalRisksDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class OccupationalRiskDatabase extends BaseDatabase {

    public static OCCUPATIONAL_RISKS = "occupational_risks"

    public findOccupationalRiskBy = async (collumn: "name" | "id", values: string[]): Promise<OccupationalRisksDB[]> => {
        
        const result: OccupationalRisksDB[] = await OccupationalRiskDatabase.connection(OccupationalRiskDatabase.OCCUPATIONAL_RISKS).whereIn(collumn, values)

        return result
    }

    public findOccupationalRiskAll = async (): Promise<OccupationalRisksDB[]> => {
        
        const result: OccupationalRisksDB[] = await OccupationalRiskDatabase.connection(OccupationalRiskDatabase.OCCUPATIONAL_RISKS)

        return result
    }

    public createOccupationalRisk = async (input: OccupationalRisksDB[]): Promise<void> => {
        
        await OccupationalRiskDatabase.connection(OccupationalRiskDatabase.OCCUPATIONAL_RISKS).insert(input)

    }


    public editOccupationalRisk = async (input: OccupationalRisksDB): Promise<void> => {
        
        const {id, name, updated_at} = input

        await OccupationalRiskDatabase.connection(OccupationalRiskDatabase.OCCUPATIONAL_RISKS).update({name, updated_at}).where({id})
    }

    public deleteOccupationalRisk = async (id: string): Promise<void> => {

        await OccupationalRiskDatabase.connection(OccupationalRiskDatabase.OCCUPATIONAL_RISKS).del().where({id})
        
    }
}