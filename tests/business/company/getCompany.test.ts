import {CompaniesBusiness} from '../../../src/business/CompaniesBusiness'
import {CompaniesDatabaseMock} from '../../moks/CompanyDatabaseMock'
import { ValidateCPFCNPJMock } from '../../moks/ValidateCPFCNPJ'
import {IdGeneratorMock} from '../../moks/IdGeneratorMock'
import { CompanyModel } from '../../../src/types/types'


describe('Testando o getCompany', () => {


    const companyBusiness = new CompaniesBusiness(
        new CompaniesDatabaseMock(),
        new ValidateCPFCNPJMock(),
        new IdGeneratorMock()
    )
    const companyMockTest: CompanyModel[] = [
        {
            cnpj: "40968052000170",
            createdAt: expect.any(String),
            id: "idCompany001",
            name: "Fernanda e Vitória Contábil Ltda",
            updatedAt: expect.any(String)
        },
        {
            cnpj: "97316319000162",
            createdAt: expect.any(String),
            id: "idCompany002",
            name: "Otávio e Rafaela Filmagens ME",
            updatedAt: expect.any(String)
        },
        {
            cnpj: "42941090000165",
            createdAt: expect.any(String),
            id: "idCompany003",
            name: "Marcos Vinicius e Isis Assessoria Jurídica Ltda",
            updatedAt: expect.any(String)
        },
        {
            cnpj: "",
            createdAt: expect.any(String),
            id: "idCompany004",
            name: "Clara e Francisco Limpeza Ltda",
            updatedAt: expect.any(String)
        }
    ]

    test("Buscar todas as empresas", async () => {

        const output = await companyBusiness.getCompany()

        expect(output).toEqual(companyMockTest)
    })
    

    
})