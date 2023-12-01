import { CompaniesBusiness } from '../../../src/business/CompaniesBusiness'
import { CompaniesDatabaseMock } from '../../moks/CompanyDatabaseMock'
import { ValidateCPFCNPJMock } from '../../moks/ValidateCPFCNPJ'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { InputDeleteCompanySchema } from '../../../src/dtos/company/InputDeleteCompany.dto'
import { BaseError } from '../../../src/errors/BaseError'

describe('Testando o getCompany.', () => {


    const companyBusiness = new CompaniesBusiness(
        new CompaniesDatabaseMock(),
        new FormDatabaseMock(),
        new ValidateCPFCNPJMock(),
        new IdGeneratorMock()
    )

    test('Sucesso ao deletar uma empresa.', async () => {

        const input = InputDeleteCompanySchema.parse(
            {
                id: "idCompany005"
            }
        )

        const output = await companyBusiness.deleteCompany(input)

        expect(output).toEqual(
            {
                message: "Empresa deletada com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso um id da empresa seja inválida.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteCompanySchema.parse(
                {
                    id: "id inválido",
                }
            )
    
           await companyBusiness.deleteCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso exita algum registro da empresa.", async () => {

        expect.assertions(2)

        try {
            const input = InputDeleteCompanySchema.parse(
                {
                    id: "idCompany003",
                }
            )
    
           await companyBusiness.deleteCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})