import {ExamsBusiness} from '../../../src/business/ExamsBusiness'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import {InputCreateExamSchema} from '../../../src/dtos/exam/InputCreateExam.dto'
import { BaseError } from '../../../src/errors/BaseError'


describe('Testando o examBusiness', () => {

    const examBusiness = new ExamsBusiness(
        new ExamsDatabaseMock(),
        new IdGeneratorMock()
    )
    
    test("Deve criar um novo exame", async () => {

        const input = InputCreateExamSchema.parse(
            {
                exams: [
                    {
                        name: "Exame teste",
                        price: 10.0
                    }
                ]
            }
        )

        const output = await examBusiness.createExam(input)

        expect(output).toEqual(
            {
                message: "Exame criado com sucesso!"
            }
        )
    })

    test("Deve criar mais de um exame", async () => {

        const input = InputCreateExamSchema.parse(
            {
                exams: [
                    {
                        name: "Exame teste",
                        price: 10.0
                    },
                    {
                        name: "Exame teste 2"
                    }
                ]
            }
        )

        const output = await examBusiness.createExam(input)

        expect(output).toEqual(
            {
                message: "Exames criados com sucesso!"
            }
        )
    })

    test('Deve gerar um erro quando o nome já existir', async () => {
        expect.assertions(2)

        try {
            const input = InputCreateExamSchema.parse(
                {
                    exams: [
                        {
                            name: "Glicose",
                            price: 10.0
                        }
                    ]
                }
            )
    
            await examBusiness.createExam(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

})