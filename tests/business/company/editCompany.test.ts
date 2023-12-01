import {CompaniesBusiness} from '../../../src/business/CompaniesBusiness'
import {CompaniesDatabaseMock} from '../../moks/CompanyDatabaseMock'
import { ValidateCPFCNPJMock } from '../../moks/ValidateCPFCNPJ'
import {IdGeneratorMock} from '../../moks/IdGeneratorMock'
import { InputEditCompanySchema } from '../../../src/dtos/company/InputEditCompany'
import { BaseError } from '../../../src/errors/BaseError'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'


describe('Testando o editCompany', () => {

    const companyBusiness = new CompaniesBusiness(
        new CompaniesDatabaseMock(),
        new FormDatabaseMock(),
        new ValidateCPFCNPJMock(),
        new IdGeneratorMock()
    )

    test('Testando a edição completa da empresa', async () => {

        const input = InputEditCompanySchema.parse(
            {
                id: "idCompany002",
                name: "Lavínia e Gael Ferragens ME",
                cnpj: "96809408000188",

            }
        )

        const output = await companyBusiness.editCompany(input)

        expect(output).toEqual(
            {
                message: "Empresa editada com sucesso!"
            }
        )
    })

    test('Testando a edição completa com empresa que não tem cnpj', async () => {

        const input = InputEditCompanySchema.parse(
            {
                id: "idCompany004",
                name: "Lavínia e Gael Ferragens ME",
                cnpj: "96809408000188",

            }
        )

        const output = await companyBusiness.editCompany(input)

        expect(output).toEqual(
            {
                message: "Empresa editada com sucesso!"
            }
        )
    })

    test('Editando apenas o cnpj', async () => {

        const input = InputEditCompanySchema.parse(
            {
                id: "idCompany002",
                cnpj: "96809408000188",

            }
        )

        const output = await companyBusiness.editCompany(input)

        expect(output).toEqual(
            {
                message: "Empresa editada com sucesso!"
            }
        )
    })

    test('Editando apenas o nome', async () => {

        const input = InputEditCompanySchema.parse(
            {
                id: "idCompany002",
                name: "Lavínia e Gael Ferragens ME"
            }
        )

        const output = await companyBusiness.editCompany(input)

        expect(output).toEqual(
            {
                message: "Empresa editada com sucesso!"
            }
        )
    })

    test("Deve gerar um erro caso o id da empresa seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditCompanySchema.parse(
                {
                    id: "id form inválido",
                    name: "Lavínia e Gael Ferragens ME",
                    cnpj: "96809408000188",
                }
            )
    
           await companyBusiness.editCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o cnpj já exista com relação a outra empresa.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditCompanySchema.parse(
                {
                    id: "idCompany002",
                    name: "Lavínia e Gael Ferragens ME",
                    cnpj: "40968052000170",
                }
            )
    
           await companyBusiness.editCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o nome já exista com relação a outra empresa.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditCompanySchema.parse(
                {
                    id: "idCompany002",
                    name: "Fernanda e Vitória Contábil Ltda",
                    cnpj: "96809408000188",
                }
            )
    
           await companyBusiness.editCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    test("Deve gerar um erro caso o cnpj seja inválido.", async () => {

        expect.assertions(2)

        try {
            const input = InputEditCompanySchema.parse(
                {
                    id: "idCompany002",
                    name: "Lavínia e Gael Ferragens ME",
                    cnpj: "40968052000179",
                }
            )
    
           await companyBusiness.editCompany(input)

        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(BaseError)
        }
    })

    
})