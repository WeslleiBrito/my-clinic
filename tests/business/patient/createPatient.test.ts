import {InputPatientSchema} from '../../../src/dtos/patient/InputPatient.dto'
import { PatientBuisness } from '../../../src/business/PatientsBusiness'
import {PatientDatabaseMock} from '../../moks/PatientDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { ValidateCPFCNPJ } from '../../../src/services/ValidateCPFCNPJ'
import { BaseError } from '../../../src/errors/BaseError'
import {FormDatabaseMock} from '../../moks/FormDatabaseMock'

describe('Testando o patientBusiness', () => {

    const patientBusiness = new PatientBuisness(
        new PatientDatabaseMock(),
        new FormDatabaseMock(),
        new IdGeneratorMock(),
        new ValidateCPFCNPJ()
    )

    test("Criando um novo paciente", async () => {

        const input = InputPatientSchema.parse(
            {
                name: "Novo paciente",
                rg: "19.629.936-6",
                cpf: "926.162.263-16"
            }
        )

        const output = await patientBusiness.createPatient(input)

        expect(output).toEqual(
            {
                message: "Paciente cadastrado com sucesso!",
                id: "idMockNew"
            }
        )
    })

    test("Criando um novo paciente sem cpf", async () => {

        const input = InputPatientSchema.parse(
            {
                name: "Novo paciente",
                rg: "19.629.936-6"
            }
        )

        const output = await patientBusiness.createPatient(input)

        expect(output).toEqual(
            {
                message: "Paciente cadastrado com sucesso!",
                id: "idMockNew"
            }
        )
    })

    test("Deve gerar um erro quando o rg já existir", async () => {
        expect.assertions(2)

        try {
            const input = InputPatientSchema.parse(
                {
                    name: "Novo paciente",
                    rg: "184133580"
                }
            )
    
           await patientBusiness.createPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o cpf já existir", async () => {
        expect.assertions(2)

        try {
            const input = InputPatientSchema.parse(
                {
                    name: "Novo paciente",
                    rg: "19.629.936-6",
                    cpf: "14963598108"
                }
            )
    
           await patientBusiness.createPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o cpf for inválido.", async () => {
        expect.assertions(2)

        try {
            const input = InputPatientSchema.parse(
                {
                    name: "Novo paciente",
                    rg: "19.629.936-6",
                    cpf: "14963598100"
                }
            )
    
           await patientBusiness.createPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})