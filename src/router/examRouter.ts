import express from "express"
import { ExamsController } from "../controller/ExamController"
import { ExamsBusiness } from "../business/ExamsBusiness"
import { ExamsDatabase } from "../database/ExamsDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { ProceduresFormsDatabase } from "../database/proceduresFormsDatabase"



export const examRouter = express.Router()

const newExameController = new ExamsController(
    new ExamsBusiness(
        new ExamsDatabase(),
        new IdGenerator(),
        new ProceduresFormsDatabase()
    )
)

examRouter.post('/', newExameController.createExam)
examRouter.put('/:id', newExameController.editExam)
examRouter.get('/', newExameController.getAllExam)
examRouter.delete('/:id', newExameController.deleteExam)