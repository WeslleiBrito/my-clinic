import { FormDB } from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'

const FormMock: FormDB[] = [
    {
        amount: 0,
        cnpj: "40968052000170",
        cpf: "14963598108",
        created_at: new Date().toISOString(),
        id: 'idForm001',
        id_company: "idCompany001",
        id_patient: "idPatient001",
        name_company: "Fernanda e Vitória Contábil Ltda",
        name_patient: "Alexandre Anderson Geraldo Figueiredo",
        number_procedures: 3,
        rg: "184133580",
        updated_at: new Date().toISOString()
    },
    {
        amount: 0,
        cnpj: "97316319000162",
        cpf: "75766888902",
        created_at: new Date().toISOString(),
        id: 'idForm002',
        id_company: "idCompany002",
        id_patient: "idPatient002",
        name_company: "Otávio e Rafaela Filmagens ME",
        name_patient: "Vanessa Benedita Rayssa Mendes",
        number_procedures: 1,
        rg: "256521098",
        updated_at: new Date().toISOString()
    },
    {
        amount: 15,
        cnpj: "42941090000165",
        cpf: "98488159889",
        created_at: new Date().toISOString(),
        id: 'idForm003',
        id_company: "idCompany003",
        id_patient: "idPatient003",
        name_company: "Marcos Vinicius e Isis Assessoria Jurídica Ltda",
        name_patient: "Cecília Rosa Carla Almada",
        number_procedures: 1,
        rg: "339141980",
        updated_at: new Date().toISOString()
    },
    {
        amount: 15,
        cnpj: undefined,
        cpf: undefined,
        created_at: new Date().toISOString(),
        id: 'idForm004',
        id_company: "idCompany004",
        id_patient: "idPatient004",
        name_company: "Clara e Francisco Limpeza Ltda",
        name_patient: "Emilly Gabrielly da Conceição",
        number_procedures: 1,
        rg: "134167879",
        updated_at: new Date().toISOString()
    }
]

export class FormDatabaseMock extends BaseDatabase {

    public static TABLE_FORMS = "forms"

    public findFormBy = async (collumn: "id" | "id_company" | "id_patient" | "id_type_exam", values: string[]): Promise<FormDB[]> => {
        
        const result: FormDB[] = []

        values.forEach((value) => {
            const search = FormMock.find((formMock) => formMock[collumn] === value)

            if(search){

                result.push({
                    amount: search.amount,
                    cnpj: search.cnpj,
                    cpf: search.cpf,
                    created_at: search.created_at,
                    id: search.id,
                    id_company: search.id_company,
                    id_patient: search.id_patient,
                    name_company: search.name_company,
                    name_patient: search.name_patient,
                    number_procedures: search.number_procedures,
                    rg: search.rg,
                    updated_at: search.updated_at
                })
            }
        })

        return result
    }

    public findAllForm = async (): Promise<FormDB[]> => {

        return FormMock
    }

    public createForm = async (input: FormDB): Promise<void> => {

    }

    public editForm = async (input: FormDB): Promise<void> => {
        
    }

    public deleteForm = async (id: string): Promise<void> => {
        
    }
}