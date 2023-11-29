import express from "express"
import { CompaniesController } from "../controller/CompanyController"
import { CompaniesBusiness } from "../business/CompaniesBusiness"
import { CompaniesDatabase } from "../database/CompaniesDatabase"
import { ValidateCPFCNPJ } from "../services/ValidateCPFCNPJ"
import { IdGenerator } from "../services/IdGenerator"
import { FormDatabase } from "../database/FormDatabase"


export const companyRouter = express.Router()


const newCompaniesController = new CompaniesController(
    new CompaniesBusiness(
        new CompaniesDatabase(),
        new FormDatabase(),
        new ValidateCPFCNPJ(),
        new IdGenerator(),
    )
)

companyRouter.post('/', newCompaniesController.createCompany)
companyRouter.put('/:id', newCompaniesController.editCompany)
companyRouter.get('/', newCompaniesController.getCompany)
companyRouter.delete('/:id', newCompaniesController.deleteCompany)