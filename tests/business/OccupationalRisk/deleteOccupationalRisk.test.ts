import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { InputDeleteCompanySchema } from '../../../src/dtos/company/InputDeleteCompany.dto'
import { BaseError } from '../../../src/errors/BaseError'
import { InputDeleteExamSchema } from '../../../src/dtos/exam/InputDeleteExam.dto'
import { OccupationalRiskBusiness } from '../../../src/business/OccupationalRiskBusiness'
import { OccupationalRiskDatabaseMock } from '../../moks/OccupationalRiskDatabaseMock'
import { InputDeleteOccupationalRiskSchema } from '../../../src/dtos/occupationalRisk/InputDeleteOccupationalRisk.dto'
import { OccupationalRiskFormsDatabaseMock } from '../../moks/OccupationalRiskFormsDatabaseMock'


describe('Testando o deleteOccupationalRisk.', () => {


    const occupationalRiskBusiness = new OccupationalRiskBusiness(
        new OccupationalRiskDatabaseMock(),
        new IdGeneratorMock(),
        new OccupationalRiskFormsDatabaseMock()
    )

    test('Sucesso ao deletar um risco ocupacional.', async () => {

        const input = InputDeleteOccupationalRiskSchema.parse(
            {
                id: "occupational004"
            }
        )

        const output = await occupationalRiskBusiness.deleteOccupationalRisk(input)

        expect(output).toEqual(
            {
                message: "Risco ocupacional deletado com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso o id do exame seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteExamSchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await occupationalRiskBusiness.deleteOccupationalRisk(input)

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
                    id: "occupational001",
                }
            )
    
            await occupationalRiskBusiness.deleteOccupationalRisk(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})