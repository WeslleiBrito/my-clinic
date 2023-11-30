import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputDeleteCompanySchema } from '../../../src/dtos/company/InputDeleteCompany.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { ExamsBusiness } from '../../../src/business/ExamsBusiness'
import { ExamsDatabaseMock } from '../../moks/ExamDatabaseMock'
import { ProceduresFormsDatabaseMock } from '../../moks/ProceduresFormsDatabaseMock'
import { InputDeleteExamSchema } from '../../../src/dtos/exam/InputDeleteExam.dto'


describe('Testando o deleteExam.', () => {


    const examBusiness = new ExamsBusiness(
        new ExamsDatabaseMock(),
        new IdGeneratorMock(),
        new ProceduresFormsDatabaseMock()
    )

    test('Sucesso ao deletar um exame.', async () => {

        const input = InputDeleteExamSchema.parse(
            {
                id: "idExam005"
            }
        )

        const output = await examBusiness.deleteExam(input)

        expect(output).toEqual(
            {
                message: "Exame deletado com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso um id do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteExamSchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await examBusiness.deleteExam(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso exita algum registro do exame.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteCompanySchema.parse(
                {
                    id: "idForm001",
                }
            )
    
            await examBusiness.deleteExam(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})