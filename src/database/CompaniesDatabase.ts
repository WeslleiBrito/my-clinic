import { CompanyDB, CompanyEditDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class CompaniesDatabase extends BaseDatabase {

    public static TABLE_COMPANIES = "companies"

    public findCompanyBy = async (collumn: 'id' | 'name' | 'cnpj', value: string): Promise<CompanyDB | undefined> => {

        const [result]: CompanyDB[] | undefined = await CompaniesDatabase.connection(CompaniesDatabase.TABLE_COMPANIES).where({[collumn]: value})
        
        return result
    }

    public createCompany = async (input: CompanyDB): Promise<void> => {

        await CompaniesDatabase.connection(CompaniesDatabase.TABLE_COMPANIES).insert(input)
    }

    public editCompany = async (input: CompanyEditDB): Promise<void> => {

        await CompaniesDatabase.connection(CompaniesDatabase.TABLE_COMPANIES).update(input)
    }

}