import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { TypeExamAsoModel } from '../../../src/types/types'
import { TypeExamAsoBusiness } from '../../../src/business/TypeExamAsoBusiness'
import { TypeExamAsoDatabaseMock } from '../../moks/TypeExamAsoDatabaseMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'



describe("Testando o get all type exam aso", () => {

    const typeExamAso = new TypeExamAsoBusiness (
        new TypeExamAsoDatabaseMock(),
        new IdGeneratorMock(),
        new FormDatabaseMock()
    )

    const typeExamAsoModel: TypeExamAsoModel[] = [
        {
            createdAt: expect.any(String),
            id: "typeExamAso001",
            name: "Admissional",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "typeExamAso002",
            name: "Demissional",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "typeExamAso003",
            name: "Retorno ao trabalho",
            updatedAt: expect.any(String)
        }
    ]

    test("Buscando todos os tipos de exames aso", async () => {

        const searchAll = await typeExamAso.getAllTypeExamAso()

        expect(searchAll).toEqual(typeExamAsoModel)
    })
})