import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputDeleteCompanySchema } from '../../../src/dtos/company/InputDeleteCompany.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { TypeExamAsoBusiness } from '../../../src/business/TypeExamAsoBusiness'
import { TypeExamAsoDatabaseMock } from '../../moks/TypeExamAsoDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { InputDeleteTypeExamAsoSchema } from '../../../src/dtos/TypeExamAso/InputDeleteTypeExamAso.dto'


describe('Testando o delete type exam aso.', () => {


    const TypeExamAso = new TypeExamAsoBusiness (
        new TypeExamAsoDatabaseMock(),
        new IdGeneratorMock(),
        new FormDatabaseMock()
    )

    test('Sucesso ao deletar um tipo de exame aso.', async () => {

        const input = InputDeleteTypeExamAsoSchema.parse(
            {
                id: "typeExamAso003"
            }
        )

        const output = await TypeExamAso.deleteTypeExamAso(input)

        expect(output).toEqual(
            {
                message: "Tipo de exame aso deletado com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso o id do tipo do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteTypeExamAsoSchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await TypeExamAso.deleteTypeExamAso(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso exita algum registro do tipo do exame aso.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteCompanySchema.parse(
                {
                    id: "typeExamAso001",
                }
            )
    
            await TypeExamAso.deleteTypeExamAso(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})