import { InputEditPatientSchema } from '../../../src/dtos/patient/InputEditPatient'
import { PatientBuisness } from '../../../src/business/PatientsBusiness'
import {PatientDatabaseMock} from '../../moks/PatientDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { ValidateCPFCNPJ } from '../../../src/services/ValidateCPFCNPJ'
import { BaseError } from '../../../src/errors/BaseError'


describe('Testando o patientBusiness', () => {

    const patientBusiness = new PatientBuisness(
        new PatientDatabaseMock(),
        new IdGeneratorMock(),
        new ValidateCPFCNPJ()
    )

    test("Edição completa de um paciente sem cpf no banco de dados", async () => {

        const input = InputEditPatientSchema.parse(
            {
                id: "idPatient004",
                name: "Sabrina Alessandra Barbosa",
                rg: "45.180.989-0",
                cpf: "830.957.289-13"
            }
        )

        const output =  await patientBusiness.editPatient(input)

        expect(output).toEqual({
            message: "Atualização concluída com sucesso!"
        })

    })

    test("Testando quando nada é informado para os parametros opcionais", async () => {

        const input = InputEditPatientSchema.parse(
            {
                id: "idPatient004"
            }
        )

        const output =  await patientBusiness.editPatient(input)

        expect(output).toEqual({
            message: "Atualização concluída com sucesso!"
        })

    })

    test("Edição completa de um paciente com cpf  no banco de dados", async () => {

        const input = InputEditPatientSchema.parse(
            {
                id: "idPatient001",
                name: "Sabrina Alessandra Barbosa",
                rg: "45.180.989-0",
                cpf: "830.957.289-13"
            }
        )

        const output =  await patientBusiness.editPatient(input)

        expect(output).toEqual({
            message: "Atualização concluída com sucesso!"
        })

    })

    test("Edição sem cpf", async () => {

        const input = InputEditPatientSchema.parse(
            {
                id: "idPatient004",
                name: "Sabrina Alessandra Barbosa",
                rg: "45.180.989-0"
            }
        )

        const output =  await patientBusiness.editPatient(input)

        expect(output).toEqual({
            message: "Atualização concluída com sucesso!"
        })

    })

    test("Deve gerar um erro quando o id do paciente for inválido.", async () => {
        expect.assertions(2)

        try {
            const input = InputEditPatientSchema.parse(
                {
                    id: "id inválido",
                    name: "Nome teste",
                    rg: "19.629.936-6",
                    cpf: "14963598100"
                }
            )
    
           await patientBusiness.editPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o cpf for inválido.", async () => {
        expect.assertions(2)

        try {
            const input = InputEditPatientSchema.parse(
                {
                    id: "idPatient002",
                    name: "Nome teste",
                    rg: "19.629.936-6",
                    cpf: "14963598101"
                }
            )
    
           await patientBusiness.editPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o cpf já existir.", async () => {
        expect.assertions(2)

        try {
            const input = InputEditPatientSchema.parse(
                {
                    id: "idPatient002",
                    name: "Nome teste",
                    rg: "19.629.936-6",
                    cpf: "14963598108"
                }
            )
    
           await patientBusiness.editPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o rg já existir.", async () => {
        expect.assertions(2)

        try {
            const input = InputEditPatientSchema.parse(
                {
                    id: "idPatient002",
                    name: "Nome teste",
                    rg: "184133580"
                }
            )
    
           await patientBusiness.editPatient(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})