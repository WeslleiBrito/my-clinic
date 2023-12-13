import express from 'express'
import cors from 'cors'
import dontenv from 'dotenv'
import { patientRouter } from './router/patientRouter'
import { companyRouter } from './router/companyRouter'
import { examRouter } from './router/examRouter'
import { occupationalRiskRouter } from './router/occupationalRiskRouter'
import { formRouter } from './router/formRouter'
import { typeExamAsoRouter } from './router/typeExamAsoRouter'

dontenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})


app.use('/patients', patientRouter)
app.use('/company', companyRouter)
app.use('/exam', examRouter)
app.use('/occupational-risk', occupationalRiskRouter)
app.use('/form', formRouter)
app.use('/type-exam-aso', typeExamAsoRouter)