import {TypeExamAsoBusiness} from '../../../src/business/TypeExamAsoBusiness'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputCreateTypeExamAsoSchema } from '../../../src/dtos/TypeExamAso/InputCreateTypeExamAso.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { TypeExamAsoDatabaseMock } from '../../moks/TypeExamAsoDatabaseMock'


describe("Testando o TypeExamAso", () => {

    const TypeExamAso = new TypeExamAsoBusiness (
        new TypeExamAsoDatabaseMock(),
        new IdGeneratorMock(),
        new FormDatabaseMock()
    )

    test("Criando um novo tipo de exame aso", async () => {

        const input = InputCreateTypeExamAsoSchema.parse(
            {
                typeExams: [
                    {
                        name: "Novo tipo de exame aso"
                    }
                ]
            }
        )

        const output = await TypeExamAso.createTypeExamAso(input)

        expect(output).toEqual({
            message: "Tipo de exame aso criado com sucesso!"
        })
    })

    test("Criando mais de um novo tipo de exame aso", async () => {

        const input = InputCreateTypeExamAsoSchema.parse(
            {
                typeExams: [
                    {
                        name: "Novo risco ocupacional"
                    },
                    {
                        name: "Novo risco ocupacional 2"
                    }
                ]
            }
        )

        const output = await TypeExamAso.createTypeExamAso(input)

        expect(output).toEqual({
            message: "Tipos de exames aso criados com sucesso!"
        })
    })

    test("Deve gerar um erro quando o existir nome duplicado com relação ao banco de dados.", async () => {
        expect.assertions(2)

        try {
            
            const input = InputCreateTypeExamAsoSchema.parse(
                {
                    typeExams: [
                        {
                            name: "Demissional"
                        }
                    ]
                }
            )
    
           await TypeExamAso.createTypeExamAso(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

})