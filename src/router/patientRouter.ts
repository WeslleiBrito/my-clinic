import express from "express"
import { PatientController } from "../controller/PatientController"
import { PatientBuisness } from "../business/PatientsBuisness"
import { PatientDatabase } from "../database/PatientsDatabase"
import { IdGenerator } from "../services/IdGenerator"

export const patientRouter = express.Router()


const newPatientController = new PatientController(
    new PatientBuisness(
        new PatientDatabase(),
        new IdGenerator()
    )
)

patientRouter.get('/', newPatientController.getPatients)
patientRouter.post('/', newPatientController.createPatient)
patientRouter.put('/:id', newPatientController.editPatient)