import express from "express"
import { IdGenerator } from "../services/IdGenerator"
import { OccupationalRiskController } from "../controller/OccupationalRiskController"
import { OccupationalRiskBusiness } from "../business/OccupationalRiskBusiness"
import { OccupationalRiskDatabase } from "../database/OccupationalRiskDatabase"



export const occupationalRiskRouter = express.Router()

const newOccupationalRisk = new OccupationalRiskController(
    new OccupationalRiskBusiness(
        new OccupationalRiskDatabase(),
        new IdGenerator()
    )
)

occupationalRiskRouter.post('/', newOccupationalRisk.createOccupationalRisk)
occupationalRiskRouter.put('/:id', newOccupationalRisk.editOccupationalRisk)
occupationalRiskRouter.get('/', newOccupationalRisk.getAllOccupationalRisk)