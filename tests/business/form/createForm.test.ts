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
import { TypeExamAsoDatabaseMock } from '../../moks/TypeExamAsoDatabaseMock'

describe("Testando a form", () => {

    const formBusiness = new FormBusiness(
        new FormDatabaseMock(),
        new ExamsDatabaseMock(),
        new CompaniesDatabaseMock(),
        new PatientDatabaseMock(),
        new ProceduresFormsDatabaseMock(),
        new IdGeneratorMock(),
        new OccupationalRiskDatabaseMock(),
        new OccupationalRiskFormsDatabaseMock(),
        new TypeExamAsoDatabaseMock()
    )

    test('Deve criar um novo formulário com status true', async () => {

        const input = InputCreateFormSchema.parse(
            {
                idCompany: "idCompany002",
                idPatient: "idPatient003",
                idTypeExamAso: "typeExamAso001",
                functionPatient: "Ajudante de pedreiro",
                status: true,
                idExams: [
                    {
                        id: "idExam002",
                        date: "2023-12-18"
                    },
                    {
                        id: "idExam001",
                        date: "2023-12-18"
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
    test('Deve criar um novo formulário com status false', async () => {

        const input = InputCreateFormSchema.parse(
            {
                idCompany: "idCompany002",
                idPatient: "idPatient003",
                idTypeExamAso: "typeExamAso001",
                functionPatient: "Ajudante de pedreiro",
                status: false,
                idExams: [
                    {
                        id: "idExam002",
                        date: "2023-12-18"
                    },
                    {
                        id: "idExam001",
                        date: "2023-12-18"
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

    test("Deve gerar um erro caso o id do tipo do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "idCompany002",
                    idPatient: "idPatient003",
                    idTypeExamAso: "id inválido",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam002",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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

   
    test("Deve gerar um erro caso o idCompany seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputCreateFormSchema.parse(
                {
                    idCompany: "id inválido",
                    idPatient: "idPatient003",
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam002",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam002",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam inválido",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam inválido",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam inválido",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam001",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam002",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam001",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam002",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam002",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
                    idExams : [
                        {
                            id: "idExam002",
                            date: "2023-12-18"
                        },
                        {
                            id: "idExam001",
                            date: "2023-12-18"
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
                    idTypeExamAso: "typeExamAso001",
                    functionPatient: "Ajudante de pedreiro",
                    status: true,
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


