import express from "express"
import { ExamsDatabase } from "../database/ExamsDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { FormController } from "../controller/FormController"
import { FormBusiness } from "../business/FormBusiness"
import { FormDatabase } from "../database/FormDatabase"
import { CompaniesDatabase } from "../database/CompaniesDatabase"
import { PatientDatabase } from "../database/PatientsDatabase"
import { ProceduresFormsDatabase } from '../database/proceduresFormsDatabase'
import { OccupationalRiskDatabase } from "../database/OccupationalRiskDatabase"
import { OccupationalRiskFormsDatabase } from "../database/OccupationalRisckFormDatabase"
import { TypeExamAsoDatabase } from "../database/TypeExamAsoDatabase"


export const formRouter = express.Router()

const newFormController = new FormController(
    new FormBusiness(
        new FormDatabase(),
        new ExamsDatabase(),
        new CompaniesDatabase(),
        new PatientDatabase(),
        new ProceduresFormsDatabase(),
        new IdGenerator(),
        new OccupationalRiskDatabase(),
        new OccupationalRiskFormsDatabase(),
        new TypeExamAsoDatabase()
    )
)

formRouter.post('/', newFormController.createForm)
formRouter.put('/:id', newFormController.editForm)
formRouter.get('/', newFormController.getAllForm)
formRouter.patch('/', newFormController.deleteForm)