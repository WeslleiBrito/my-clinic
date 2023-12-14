import {OccupationalRiskBusiness} from '../../../src/business/OccupationalRiskBusiness'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputEditOccupationalRiskSchema } from '../../../src/dtos/occupationalRisk/InputEditOccupationalRisk.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { OccupationalRiskFormsDatabaseMock } from '../../moks/OccupationalRiskFormsDatabaseMock'



describe("Testando o occupationalRisk", () => {

    const OccupationalRisk = new OccupationalRiskBusiness(
        new OccupationalRiskDatabaseMock(),
        new IdGeneratorMock(),
        new OccupationalRiskFormsDatabaseMock()
    )


    test("Edição completa", async () => {

        const input = InputEditOccupationalRiskSchema.parse({
            id: "occupational002",
            name: "Novo nome"
        })

        const output = await OccupationalRisk.editOccupationalRisk(input)

        expect(output).toEqual(
            {
                message: "Risco ocupacional editado com sucesso atualizado com sucesso!"
            }
        )
    })

    test("Edição sem passar o nome", async () => {

        const input = InputEditOccupationalRiskSchema.parse({
            id: "occupational002"
        })

        const output = await OccupationalRisk.editOccupationalRisk(input)

        expect(output).toEqual(
            {
                message: "Risco ocupacional editado com sucesso atualizado com sucesso!"
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
    
           await OccupationalRisk.editOccupationalRisk(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro quando o nome já estiver sendo usando em outro risco ocupacional.", async () => {
        expect.assertions(2)

        try {
            
            const input = InputEditOccupationalRiskSchema.parse(
                {
                    id: "occupational002",
                    name: "Fisico"
                }
            )
    
           await OccupationalRisk.editOccupationalRisk(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})