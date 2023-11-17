import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { InputCreateCompanyDTO, OutputCreateCompanyDTO } from "../dtos/company/InputCreateCompany";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { Company } from "../models/Company";
import { IdGenerator } from "../services/IdGenerator";
import { ValidateCPFCNPJ } from "../services/ValidateCPFCNPJ";



export class CompaniesBusiness {
    constructor(
        private companiesDatabase: CompaniesDatabase,
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
                cnpj: cnpj ? cnpj.replace(/[^a-zA-Z0-9]/g, '') : null,
                created_at: newCompany.getCreatedAt(),
                name: newCompany.getName(),
                updated_at: newCompany.getUpdatedAt()
            }
        )

        return {
            message: "Empresa cadastrada com sucesso!"
        }
    }
}