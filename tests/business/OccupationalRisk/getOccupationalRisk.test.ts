import {OccupationalRiskBusiness} from '../../../src/business/OccupationalRiskBusiness'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { OccupationalRiscModel } from '../../../src/types/types'



describe("Testando o occupationalRisk", () => {

    const occupationalRisk = new OccupationalRiskBusiness(
        new OccupationalRiskDatabaseMock(),
        new IdGeneratorMock()
    )

    const occupationalModel: OccupationalRiscModel[] = [
        {
            createdAt: expect.any(String),
            id: "occupational001",
            name: "Fisico",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "occupational002",
            name: "Ruído",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            id: "occupational003",
            name: "Poeira",
            updatedAt: expect.any(String)
        }
    ]

    test("Buscando todos os ricos ocupacionais", async () => {

        const searchAll = await occupationalRisk.getAllOccupationalRisk()

        expect(searchAll).toEqual(occupationalModel)
    })
})