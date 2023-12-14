import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputEditOccupationalRiskSchema } from '../../../src/dtos/occupationalRisk/InputEditOccupationalRisk.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { TypeExamAsoBusiness } from '../../../src/business/TypeExamAsoBusiness'
import { TypeExamAsoDatabaseMock } from '../../moks/TypeExamAsoDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { InputEditTypeExamAsoSchema } from '../../../src/dtos/TypeExamAso/InputEditTypeExamAso.dto'



describe("Testando o Type Exam Aso", () => {

    const typeExamAsoBusiness = new TypeExamAsoBusiness (
        new TypeExamAsoDatabaseMock(),
        new IdGeneratorMock(),
        new FormDatabaseMock()
    )


    test("Edição completa", async () => {

        const input = InputEditTypeExamAsoSchema.parse({
            id: "typeExamAso001",
            name: "Novo nome"
        })

        const output = await typeExamAsoBusiness.editTypeExamAso(input)

        expect(output).toEqual(
            {
                message: "Formulário atualizado com sucesso!"
            }
        )
    })

    test("Edição sem passar o nome", async () => {

        const input = InputEditOccupationalRiskSchema.parse({
            id: "typeExamAso002"
        })

        const output = await typeExamAsoBusiness.editTypeExamAso(input)

        expect(output).toEqual(
            {
                message: "Formulário atualizado com sucesso!"
            }
        )
    })

    test("Deve gerar um erro quando o id não for localizado.", async () => {
        expect.assertions(2)

        try {
            
            const input = InputEditOccupationalRiskSchema.parse(
                {
                    id: "id inválido"
                }
            )
    
           await typeExamAsoBusiness.editTypeExamAso(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o nome já estiver sendo usando em outro tipo de exame aso.", async () => {
        expect.assertions(2)

        try {
            
            const input = InputEditOccupationalRiskSchema.parse(
                {
                    id: "typeExamAso002",
                    name: "Demissional"
                }
            )
    
           await typeExamAsoBusiness.editTypeExamAso(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})