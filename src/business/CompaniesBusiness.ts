import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { InputCreateCompanyDTO, OutputCreateCompanyDTO } from "../dtos/company/InputCreateCompany";
import { InputDeleteCompanyDTO, OutputDeleteCompanyDTO } from "../dtos/company/InputDeleteCompany.dto";
import { InputEditCompanyDTO, OutputEditCompanyDTO } from "../dtos/company/InputEditCompany";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Company } from "../models/Company";
import { IdGenerator } from "../services/IdGenerator";
import { ValidateCPFCNPJ } from "../services/ValidateCPFCNPJ";
import { CompanyModel } from "../types/types";



export class CompaniesBusiness {
    constructor(
        private companiesDatabase: CompaniesDatabase,
        private formDatabase: FormDatabase,
        private validateCNPJ: ValidateCPFCNPJ,
        private idGenerator: IdGenerator
    ){}

    public createCompany = async (input: InputCreateCompanyDTO): Promise<OutputCreateCompanyDTO> => {

        const {name, cnpj} = input

        if(cnpj){

            const cnpjValid = this.validateCNPJ.validate(cnpj)

            if(!cnpjValid){
                throw new BadRequestError("CNPJ inválido, verifique os dados e tente novamente.")
            }

            const cnpjExist = await this.companiesDatabase.findCompanyBy('cnpj', cnpj.replace(/[^a-zA-Z0-9]/g, ''))

            if(cnpjExist){
                throw new ConflictError("O cnpj informado já existe.")
            }
        }

        const nameExist = await this.companiesDatabase.findCompanyBy("name", name)

        if(nameExist){
            throw new ConflictError("O nome informado já existe.")
        }

        const id = this.idGenerator.generate()
        const date = new Date().toISOString()

        const newCompany = new Company(
            id,
            name,
            cnpj ? cnpj.replace(/[^a-zA-Z0-9]/g, '') : cnpj,
            date,
            date
        )

        await this.companiesDatabase.createCompany(
            {
                id: newCompany.getId(),
                cnpj: cnpj ? cnpj.replace(/[^a-zA-Z0-9]/g, '') : "",
                created_at: newCompany.getCreatedAt(),
                name: newCompany.getName(),
                updated_at: newCompany.getUpdatedAt()
            }
        )

        return {
            message: "Empresa cadastrada com sucesso!",
            id
        }
    }

    public editCompany = async (input: InputEditCompanyDTO): Promise<OutputEditCompanyDTO> => {

        const {id, cnpj, name} = input
        

        const account = await this.companiesDatabase.findCompanyBy('id', id)

        
        if(!account){
            throw new NotFoundError('Empresa não localizada.')
        }

        let newCnpj = account.cnpj || ""

        if(cnpj){

            const cnpjValid = this.validateCNPJ.validate(cnpj)

            if(!cnpjValid){
                throw new BadRequestError("CNPJ inválido, verifique os dados e tente novamente.")
            }

            const cnpjExist = await this.companiesDatabase.findCompanyBy('cnpj', cnpj.replace(/[^a-zA-Z0-9]/g, ''))

            if(cnpjExist){
                if(cnpjExist.id !== account.id){
                    throw new ConflictError("O cnpj informado já existe.")
                }
            }
            

            newCnpj = cnpj.replace(/[^a-zA-Z0-9]/g, '')
        }

        if(name){
            const nameExist = await this.companiesDatabase.findCompanyBy("name", name)

            if(nameExist){
                if(nameExist.id !== account.id){
                    throw new ConflictError("O nome informado já existe.")
                }
            }
            
        }
        
        await this.companiesDatabase.editCompany(
            {
                cnpj: newCnpj,
                id: id,
                name: name || account.name,
                updated_at: new Date().toISOString()
            }
        )

        return {
            message: "Empresa editada com sucesso!"
        }
    }

    public getCompany = async (): Promise<CompanyModel[]> => {

        const result = await this.companiesDatabase.getAllCompanies()

        return result.map((company) => {
            
            return {
                id: company.id,
                name: company.name,
                cnpj: company.cnpj ? company.cnpj : "",
                createdAt: company.created_at,
                updatedAt: company.updated_at
            }
        })
    }

    public deleteCompany = async (input: InputDeleteCompanyDTO): Promise<OutputDeleteCompanyDTO> => {

        const company = await this.companiesDatabase.findCompanyBy('id', input.id)

        if(!company){
            throw new NotFoundError("Empresa não encontrada, verifique o id")
        }

        const [isInteraction] = await this.formDatabase.findFormBy('id_company', [input.id])
        
        if(isInteraction){
            throw new BadRequestError("Não é possível excluir uma empresa que possui registros ativos.")
        }

        await this.companiesDatabase.deleteCompany(input.id)

        return {
            message: "Empresa deletada com sucesso!"
        }
    }
}