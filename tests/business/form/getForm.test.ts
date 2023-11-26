import { FormBusiness } from '../../../src/business/FormBusiness'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { PatientDatabaseMock } from '../../moks/PatientDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { BaseError } from '../../../src/errors/BaseError'
import { ModelForm } from '../../../src/types/types'


describe("Testando o getForms", () => {

    const formBusiness = new FormBusiness(
        new FormDatabaseMock(),
        new ExamsDatabaseMock(),
        new CompaniesDatabaseMock(),
        new PatientDatabaseMock(),
        new ProceduresFormsDatabaseMock(),
        new IdGeneratorMock()
    )

    test('Buscando todos os formulários', async () => {
        const resultForm: ModelForm[] = [
            {
                id: 'idForm001',
                cnpj: '40968052000170',
                cpf: '14963598108',
                createdAt: expect.any(String),
                exams: [
                    {
                        id: "idExam003",
                        name: "Avaliação clínica",
                        price: 0
                    },
                    {
                        id: "idExam001",
                        name: "Glicose",
                        price: 0
                    },
                    {
                        id: "idExam002",
                        name: "Espirometria",
                        price: 0
                    }
                ],
                amount: 0,
                idCompany: "idCompany001",
                idPatient: "idPatient001",
                nameCompany: "Fernanda e Vitória Contábil Ltda",
                namePatient: "Alexandre Anderson Geraldo Figueiredo",
                numberProcedures: 3,
                rg: "184133580",
                updatedAt: expect.any(String)
            },
            {
                id: 'idForm002',
                cnpj: '97316319000162',
                cpf: '75766888902',
                createdAt: expect.any(String),
                exams: [
                   
                    {
                        id: "idExam001",
                        name: "Glicose",
                        price: 0
                    }
                ],
                amount: 0,
                idCompany: "idCompany002",
                idPatient: "idPatient002",
                nameCompany: "Otávio e Rafaela Filmagens ME",
                namePatient: "Vanessa Benedita Rayssa Mendes",
                numberProcedures: 1,
                rg: "256521098",
                updatedAt: expect.any(String)
            },
            {
                id: 'idForm003',
                cnpj: '42941090000165',
                cpf: '98488159889',
                createdAt: expect.any(String),
                exams: [
                   
                    {
                        id: "idExam002",
                        name: "Espirometria",
                        price: 15
                    }
                ],
                amount: 15,
                idCompany: "idCompany003",
                idPatient: "idPatient003",
                nameCompany: "Marcos Vinicius e Isis Assessoria Jurídica Ltda",
                namePatient: "Cecília Rosa Carla Almada",
                numberProcedures: 1,
                rg: "339141980",
                updatedAt: expect.any(String)
            }
        ]

        const result = await formBusiness.getAllForms()

        expect(result).toEqual(resultForm)
    })
})