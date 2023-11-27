import {ExamsBusiness} from '../../../src/business/ExamsBusiness'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputEditExamSchema } from '../../../src/dtos/exam/InputEditExam.dto'
import { BaseError } from '../../../src/errors/BaseError'


describe('Testando o examBusiness', () => {

    const examBusiness = new ExamsBusiness(
        new ExamsDatabaseMock(),
        new IdGeneratorMock()
    )

    test('Testando o editExam completo do exame', async () => {

        const input = InputEditExamSchema.parse(
            {
                id: "idExam001",
                name: "Novo nome",
                price: 1000
            }
        )

        const output = await examBusiness.editExam(input)

        expect(output).toEqual(
            {
                message: "Exame atualizado com sucesso!"
            }
        )
    })

    test('Testando o editExam apenas o name', async () => {

        const input = InputEditExamSchema.parse(
            {
                id: "idExam001",
                name: "Novo nome"
            }
        )

        const output = await examBusiness.editExam(input)

        expect(output).toEqual(
            {
                message: "Exame atualizado com sucesso!"
            }
        )
    })

    test('Testando o editExam apenas o price', async () => {

        const input = InputEditExamSchema.parse(
            {
                id: "idExam001",
                price: 1000
            }
        )

        const output = await examBusiness.editExam(input)

        expect(output).toEqual(
            {
                message: "Exame atualizado com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso o id do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditExamSchema.parse(
                {
                    id: "id form inválido",
                    name: "Novo nome"
                }
            )
    
           await examBusiness.editExam(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o nome do exame já exista.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditExamSchema.parse(
                {
                    id: "idExam001",
                    name: "espirometria"
                }
            )
    
           await examBusiness.editExam(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})