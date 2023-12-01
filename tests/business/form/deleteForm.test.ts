import {FormBusiness} from '../../../src/business/FormBusiness'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { InputDeleteFormSchema } from '../../../src/dtos/Form/InputDeleteForm.dto'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { BaseError } from '../../../src/errors/BaseError'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { OccupationalRiskFormsDatabaseMock } from '../../moks/OccupationalRiskFormsDatabaseMock'


describe("Testando a edição dos formulários", () => {

    const formBusiness = new FormBusiness(
        new FormDatabaseMock(),
        new ExamsDatabaseMock(),
        new CompaniesDatabaseMock(),
        new PatientDatabaseMock(),
        new ProceduresFormsDatabaseMock(),
        new IdGeneratorMock(),
        new OccupationalRiskDatabaseMock(),
        new OccupationalRiskFormsDatabaseMock()
    )

    test("Sucesso ao deletar", async () => {

        const input = InputDeleteFormSchema.parse(
            {
                id: "idForm001"
            }
        )

        const output = await formBusiness.deleteForm(input)
        
        expect(output).toEqual(
            {
                message: "Formulário deletado com sucesso."
            }
        )
    })

    test("Deve gerar um erro caso um id do formulário seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteFormSchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await formBusiness.deleteForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

})