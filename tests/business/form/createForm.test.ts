import {FormBusiness} from '../../../src/business/FormBusiness'
import { InputCreateFormSchema } from '../../../src/dtos/Form/InputCreateForm.dto'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { ZodError } from 'zod'
import { BaseError } from '../../../src/errors/BaseError'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { OccupationalRiskFormsDatabaseMock } from '../../moks/OccupationalRiskFormsDatabaseMock'

describe("Testando a form", () => {

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

    test('Deve criar um novo formulário', async () => {

        const input = InputCreateFormSchema.parse(
            {
                idCompany: "idCompany002",
                idPatient: "idPatient003",
                idExams: [
                    {
                        id: "idExam002"
                    },
                    {
                        id: "idExam001"
                    }
                ],
                idOccupationalHazards: [
                    {
                        id: "occupational001"
                    },
                    {
                        id: "occupational002"
                    }
                ]
            }
        )

        const output = await formBusiness.createForm(input)

        expect(output).toEqual({
            message: "Formulário criado com sucesso!"
        })
    })

    test("Deve gerar um erro caso o idComapany seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany inválido",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam002"
                        },
                        {
                            id: "idExam001"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o idPatient seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient inválido",
                    idExams : [
                        {
                            id: "idExam002"
                        },
                        {
                            id: "idExam001"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o 1 idExam seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam inválido"
                        },
                        {
                            id: "idExam001"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o mais de um idExam seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam inválido"
                        },
                        {
                            id: "idExam inválido"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o 1 idOccupationalHazards seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam001"
                        },
                        {
                            id: "idExam002"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "id inválido"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o mais de um idOccupationalHazards seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam001"
                        },
                        {
                            id: "idExam002"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "id inválido 1"
                        },
                        {
                            id: "id inválido 2"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o idComapany não seja informado", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idPatient: "idPatient003",
                    idExams : [
                        {
                            id: "idExam002"
                        },
                        {
                            id: "idExam001"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(ZodError)
        }
    })

    test("Deve gerar um erro caso o idPatient não seja informado", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idExams : [
                        {
                            id: "idExam002"
                        },
                        {
                            id: "idExam001"
                        }
                    ],
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(ZodError)
        }
    })

    test("Deve gerar um erro caso o idExams não seja informado", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idOccupationalHazards: [
                        {
                            id: "occupational001"
                        },
                        {
                            id: "occupational002"
                        }
                    ]
                }
            )
    
            const output = await formBusiness.createForm(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(ZodError)
        }
    })
})


