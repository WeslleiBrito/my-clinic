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
})