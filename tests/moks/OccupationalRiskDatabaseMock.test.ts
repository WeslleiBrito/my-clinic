import { OccupationalRisksDB } from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'


const OccupationalRisksMock: OccupationalRisksDB[] = [
    {
        created_at: new Date().toISOString(),
        id: "occupational001",
        name: "Fisico",
        updated_at: new Date().toISOString()
    },
    {
        created_at: new Date().toISOString(),
        id: "occupational002",
        name: "Ruído",
        updated_at: new Date().toISOString()
    },
    {
        created_at: new Date().toISOString(),
        id: "occupational003",
        name: "Poeira",
        updated_at: new Date().toISOString()
    }
]


export class OccupationalRiskDatabaseMock extends BaseDatabase {

    public static OCCUPATIONAL_RISKS = "occupational_risks"

    public findOccupationalRiskBy = async (collumn: "name" | "id", values: string[]): Promise<OccupationalRisksDB[]> => {
        
        const result: OccupationalRisksDB[] = []

        values.forEach((value) => {
            const search = OccupationalRisksMock.find((Occupational) => Occupational[collumn] === value)

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

    public findOccupationalRiskAll = async (): Promise<OccupationalRisksDB[]> => {

        return OccupationalRisksMock
    }

    public createOccupationalRisk = async (input: OccupationalRisksDB[]): Promise<void> => {}


    public editOccupationalRisk = async (input: OccupationalRisksDB): Promise<void> => {}
}