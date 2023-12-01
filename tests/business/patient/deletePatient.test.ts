import { PatientBuisness } from '../../../src/business/PatientsBusiness'
import { ValidateCPFCNPJMock } from '../../moks/ValidateCPFCNPJ'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { BaseError } from '../../../src/errors/BaseError'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { InputDeletePatientSchema } from '../../../src/dtos/patient/InputDeletePatient.dto'

describe('Testando o deletePatient.', () => {


    const patientBusiness = new PatientBuisness(
        new PatientDatabaseMock(),
        new FormDatabaseMock(),
        new IdGeneratorMock(),
        new ValidateCPFCNPJMock()
    )

    test('Sucesso ao deletar um paciente.', async () => {

        const input = InputDeletePatientSchema.parse(
            {
                id: "idPatient005"
            }
        )

        const output = await patientBusiness.deletePatient(input)

        expect(output).toEqual(
            {
                message: "Paciente deletada com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso um id do paciente seja inválida.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeletePatientSchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await patientBusiness.deletePatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso exita algum registro do paciente.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeletePatientSchema.parse(
                {
                    id: "idPatient003",
                }
            )
    
           await patientBusiness.deletePatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})