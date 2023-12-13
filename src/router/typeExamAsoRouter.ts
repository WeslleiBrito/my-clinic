import express from "express"
import { IdGenerator } from "../services/IdGenerator"
import { OccupationalRiskFormsDatabase } from "../database/OccupationalRisckFormDatabase"
import { TypeExamAsoController } from "../controller/TypeExamAsoController"
import { TypeExamAsoBusiness } from "../business/TypeExamAsoBusiness"
import { TypeExamAsoDatabase } from "../database/TypeExamAsoDatabase"
import { FormDatabase } from "../database/FormDatabase"



export const typeExamAsoRouter = express.Router()

const newTypeExamAsoController = new TypeExamAsoController (
    new TypeExamAsoBusiness(
        new TypeExamAsoDatabase(),
        new IdGenerator(),
        new FormDatabase()
    )
)

typeExamAsoRouter.post('/', newTypeExamAsoController.createTypeExamAso)
typeExamAsoRouter.put('/:id', newTypeExamAsoController.editTypeExamAso)
typeExamAsoRouter.delete('/:id', newTypeExamAsoController.deleteTypeExamAso)
typeExamAsoRouter.get('/', newTypeExamAsoController.getAllTypeExamAso)