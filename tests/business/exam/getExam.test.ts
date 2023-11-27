import {ExamsBusiness} from '../../../src/business/ExamsBusiness'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { ExamModel } from '../../../src/types/types'


describe('Testando o examBusiness', () => {

    const examBusiness = new ExamsBusiness(
        new ExamsDatabaseMock(),
        new IdGeneratorMock()
    )

    const examModelMock: ExamModel[] = [
        {
            createdAt: expect.any(String),
            id: "idExam001",
            name: "Glicose",
            price: 0,
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "idExam002",
            name: "Espirometria",
            price: 15,
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "idExam003",
            name: "Avaliação clínica",
            price: 0,
            updatedAt: expect.any(String)
        },

        {
            createdAt: expect.any(String),
            id: "idExam004",
            name: "Micológico de unha",
            price: 30,
            updatedAt: expect.any(String)
        },
    ] 

    test("Buscando todos os exams", async () => {

        const output = await examBusiness.getAllExam()

        expect(output).toEqual(examModelMock)
    })
})