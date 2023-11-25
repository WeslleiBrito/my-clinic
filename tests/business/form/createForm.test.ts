import {FormBusiness} from '../../../src/business/FormBusiness'
import { InputCreateFormSchema } from '../../../src/dtos/Form/InputCreateForm.dto'
import { ValidateCPFCNPJ } from '../../../src/services/ValidateCPFCNPJ'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'

describe("Testando a form", () => {

    const formBusiness = new FormBusiness(
        new FormDatabaseMock(),
        new ExamsDatabaseMock(),
        new CompaniesDatabaseMock(),
        new PatientDatabaseMock(),
        new ProceduresFormsDatabaseMock(),
        new IdGeneratorMock(),
        new ValidateCPFCNPJ()
    )

    test('Deve criar um novo formulário', async () => {

        const input = InputCreateFormSchema.parse(
            {
                idCompany: "idCompany002",
                idPatient: "idPatient003",
                idExams : [
                    {
                        id: "idExam002"
                    },
                    {
                        id: "idExam001"
                    }
                ]
            }
        )

        const output = await formBusiness.createForm(input)

        expect(output).toEqual({
            message: "Formulário criado com sucesso!"
        })
    })
})


