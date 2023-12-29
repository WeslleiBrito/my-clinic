import {CompaniesBusiness} from '../../../src/business/CompaniesBusiness'
import {CompaniesDatabaseMock} from '../../moks/CompanyDatabaseMock'
import { ValidateCPFCNPJMock } from '../../moks/ValidateCPFCNPJ'
import {IdGeneratorMock} from '../../moks/IdGeneratorMock'
import { InputCreateCompanySchema } from '../../../src/dtos/company/InputCreateCompany'
import { BaseError } from '../../../src/errors/BaseError'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'
import { ValidateCPFCNPJ } from '../../../src/services/ValidateCPFCNPJ'
import { IdGenerator } from '../../../src/services/IdGenerator'


describe('Testando o createCompany', () => {

    const companyBusiness = new CompaniesBusiness(
        new CompaniesDatabaseMock(),
        new FormDatabaseMock(),
        new ValidateCPFCNPJ(),
        new IdGeneratorMock()
    )

    test("Testando a criação de uma nova empresa com cnpj", async () => {
        
        const input = InputCreateCompanySchema.parse(
            {
                name: "Alessandra e Gabriel Telecomunicações Ltda",
                cnpj: "73.875.650/0001-54"
            }
        )

        const output = await companyBusiness.createCompany(input)

        expect(output).toEqual({
            message: "Empresa cadastrada com sucesso!",
            id: "idMockNew"
        })
    })

    test("Testando a criação de uma nova empresa sem cnpj", async () => {
        
        const input = InputCreateCompanySchema.parse(
            {
                name: "Felipe e Davi Entulhos ME"
            }
        )

        const output = await companyBusiness.createCompany(input)

        expect(output).toEqual({
            message: "Empresa cadastrada com sucesso!",
            id: "idMockNew"
        })
    })

    test('Deve gerar um erro quando o cnpj for inválido com relação aos números e não a estrutura', async () => {
        expect.assertions(2)

        try {
            const input = InputCreateCompanySchema.parse(
                {
                    name: "Sônia e Isabel Ferragens ME",
                    cnpj: "14097871000189"
                }
            )
    
            const output = await companyBusiness.createCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test('Deve gerar um erro quando o cnpj já existir', async () => {
        expect.assertions(2)

        try {
            const input = InputCreateCompanySchema.parse(
                {
                    name: "Sônia e Isabel Ferragens ME",
                    cnpj: "97316319000162"
                }
            )
    
            const output = await companyBusiness.createCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test('Deve gerar um erro quando o nome já existir', async () => {
        expect.assertions(2)

        try {
            const input = InputCreateCompanySchema.parse(
                {
                    name: "Otávio e Rafaela Filmagens ME"
                }
            )
    
            const output = await companyBusiness.createCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })
})