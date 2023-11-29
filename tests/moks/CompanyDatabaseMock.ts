import { CompanyDB, CompanyEditDB } from '../../src/types/types'
import { BaseDatabase } from '../../src/database/BaseDatabase'

const CompanyMock: CompanyDB[] = [
    {
        cnpj: "40968052000170",
        created_at: new Date().toISOString(),
        id: "idCompany001",
        name: "Fernanda e Vitória Contábil Ltda",
        updated_at: new Date().toISOString(),
    },
    {
        cnpj: "97316319000162",
        created_at: new Date().toISOString(),
        id: "idCompany002",
        name: "Otávio e Rafaela Filmagens ME",
        updated_at: new Date().toISOString(),
    },
    {
        cnpj: "42941090000165",
        created_at: new Date().toISOString(),
        id: "idCompany003",
        name: "Marcos Vinicius e Isis Assessoria Jurídica Ltda",
        updated_at: new Date().toISOString(),
    },
    {
        cnpj: undefined,
        created_at: new Date().toISOString(),
        id: "idCompany004",
        name: "Clara e Francisco Limpeza Ltda",
        updated_at: new Date().toISOString(),
    },
    {
        cnpj: "48231240000123",
        created_at: new Date().toISOString(),
        id: "idCompany005",
        name: "Fernando e Mário Buffet ME",
        updated_at: new Date().toISOString(),
    }
]


export class CompaniesDatabaseMock extends BaseDatabase {

    public static TABLE_COMPANIES = "companies"

    public findCompanyBy = async (collumn: 'id' | 'name' | 'cnpj', value: string): Promise<CompanyDB | undefined> => {

        const result: CompanyDB | undefined = CompanyMock.find((company) => company[collumn] === value)
        
        return result
    }

    public createCompany = async (input: CompanyDB): Promise<void> => {

    }

    public editCompany = async (input: CompanyEditDB): Promise<void> => {

    }

    public getAllCompanies = async (): Promise<CompanyDB[]> => {
       
        return CompanyMock 
    }

    public deleteCompany = async (id: string): Promise<void> => {

    }
}