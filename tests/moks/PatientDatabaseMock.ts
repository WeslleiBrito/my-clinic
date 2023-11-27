import { PatientDB } from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'


const PatientsMock: PatientDB[] = [
    {
        created_at: new Date().toISOString(),
        id: "idPatient001",
        name: "Alexandre Anderson Geraldo Figueiredo",
        rg: "184133580",
        updated_at: new Date().toISOString(),
        cpf: "14963598108"
    },
    {
        created_at: new Date().toISOString(),
        id: "idPatient002",
        name: "Vanessa Benedita Rayssa Mendes",
        rg: "256521098",
        updated_at: new Date().toISOString(),
        cpf: "75766888902"
    },
    {
        created_at: new Date().toISOString(),
        id: "idPatient003",
        name: "Cecília Rosa Carla Almada",
        rg: "339141980",
        updated_at: new Date().toISOString(),
        cpf: "98488159889"
    },
    {
        created_at: new Date().toISOString(),
        id: "idPatient004",
        name: "Emilly Gabrielly da Conceição",
        rg: "134167879",
        updated_at: new Date().toISOString(),
        cpf: undefined
    }
]


export class PatientDatabaseMock extends BaseDatabase {

    public static TABLE_PATIENTS = "patients"

    public createPatient = async (input: PatientDB) => {
    }   


    public findPatientBy = async (collumn: 'rg' | 'cpf' | 'id' | 'name', value: string): Promise<PatientDB | undefined> => {

        const result: PatientDB | undefined = PatientsMock.find((patient) => patient[collumn] === value)
        
        return result
    }
   

    public findPatientAll = async (): Promise<PatientDB[]> => {

        return PatientsMock
    }

    public editPatient = async (input: PatientDB): Promise<void> => {

    }
   
    
}