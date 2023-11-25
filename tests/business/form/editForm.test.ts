import {FormBusiness} from '../../../src/business/FormBusiness'
import { InputEditFormSchema } from '../../../src/dtos/form/InputEditForm.dto'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { ZodError } from 'zod'
import { BaseError } from '../../../src/errors/BaseError'


describe("Testando a edição dos formulários", () => {

    const formBusiness = new FormBusiness(
        new FormDatabaseMock(),
        new ExamsDatabaseMock(),
        new CompaniesDatabaseMock(),
        new PatientDatabaseMock(),
        new ProceduresFormsDatabaseMock(),
        new IdGeneratorMock()
    )

    test("Testando edição completa do form", async () => {

        const input = InputEditFormSchema.parse(
            {
                id: "idForm001",
                idCompany: "idCompany002",
                idPatient: "idPatient002",
                idExams: [
                    {
                        id: "idExam002",
                        acction: false
                    },
                    {
                        id: "idExam004",
                        acction: true
                    }

                ]
            }
        )

        const output = await formBusiness.editForm(input)

        expect(output).toEqual({
            message: "Formulário atualizado com sucesso!"
        })
    })

    test("Deve gerar um erro caso o id do formulário seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditFormSchema.parse(
                {
                    id: "id form inválido",
                    idPatient: "idPatient003",
                    idCompany: "idComapany003",
                    idExams : [
                        {
                            id: "idExam002",
                            acction: false
                        },
                        {
                            id: "idExam001",
                            acction: false
                        }
                    ]
                }
            )
    
           await formBusiness.editForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o idCompany da empresa seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditFormSchema.parse(
                {
                    id: "idForm002",
                    idCompany: "idComapany inválido",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam002",
                            acction: false
                        },
                        {
                            id: "idExam001",
                            acction: false
                        }
                    ]
                }
            )
    
           await formBusiness.editForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o idPatient da empresa seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditFormSchema.parse(
                {
                    id: "idForm002",
                    idCompany: "idCompany002",
                    idPatient: "idPatient inválido",
                    idExams : [
                        {
                            id: "idExam002",
                            acction: false
                        },
                        {
                            id: "idExam001",
                            acction: false
                        }
                    ]
                }
            )
    
           await formBusiness.editForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso um id do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditFormSchema.parse(
                {
                    id: "idForm002",
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam invalido 1",
                            acction: false
                        },
                        {
                            id: "idExam001",
                            acction: false
                        }
                    ]
                }
            )
    
           await formBusiness.editForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso mais de um id do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditFormSchema.parse(
                {
                    id: "idForm002",
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam invalido 1",
                            acction: false
                        },
                        {
                            id: "idExam invalido 1",
                            acction: false
                        }
                    ]
                }
            )
    
           await formBusiness.editForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})