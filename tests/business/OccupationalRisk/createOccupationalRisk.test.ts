import {OccupationalRiskBusiness} from '../../../src/business/OccupationalRiskBusiness'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputCreateOccupationalRiskSchema } from '../../../src/dtos/occupationalRisk/InputCreateOccupationalRisk.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { OccupationalRiskFormsDatabaseMock } from '../../moks/OccupationalRiskFormsDatabaseMock'

describe("Testando o occupationalRisk", () => {

    const OccupationalRisk = new OccupationalRiskBusiness(
        new OccupationalRiskDatabaseMock(),
        new IdGeneratorMock(),
        new OccupationalRiskFormsDatabaseMock()
    )

    test("Criando um novo risco ocupacional", async () => {

        const input = InputCreateOccupationalRiskSchema.parse(
            {
                occupationalRisk: [
                    {
                        name: "Novo risco ocupacional"
                    }
                ]
            }
        )

        const output = await OccupationalRisk.createOccupationalRisk(input)

        expect(output).toEqual({
            message: "Risco ocupacional criado com sucesso!"
        })
    })

    test("Criando um novo risco ocupacional", async () => {

        const input = InputCreateOccupationalRiskSchema.parse(
            {
                occupationalRisk: [
                    {
                        name: "Novo risco ocupacional"
                    },
                    {
                        name: "Novo risco ocupacional 2"
                    }
                ]
            }
        )

        const output = await OccupationalRisk.createOccupationalRisk(input)

        expect(output).toEqual({
            message: "Riscos ocupacionais criados com sucesso!"
        })
    })

    test("Deve gerar um erro quando o existir nome duplicado com relação ao banco de dados.", async () => {
        expect.assertions(2)

        try {
            
            const input = InputCreateOccupationalRiskSchema.parse(
                {
                    occupationalRisk: [
                        {
                            name: "Ruído"
                        }
                    ]
                }
            )
    
           await OccupationalRisk.createOccupationalRisk(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

})