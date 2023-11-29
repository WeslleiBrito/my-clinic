import { PatientBuisness } from '../../../src/business/PatientsBusiness'
import {PatientDatabaseMock} from '../../moks/PatientDatabaseMock'
import { IdGeneratorMock } from '../../moks/IdGeneratorMock'
import { ValidateCPFCNPJ } from '../../../src/services/ValidateCPFCNPJ'
import { PatientModel } from '../../../src/models/Patient'
import { FormDatabaseMock } from '../../moks/FormDatabaseMock'



describe('Testando o patientBusiness', () => {

    const patientBusiness = new PatientBuisness(
        new PatientDatabaseMock(),
        new FormDatabaseMock(),
        new IdGeneratorMock(),
        new ValidateCPFCNPJ()
    )

    const patientMockForm: PatientModel[] = [
        {
            createdAt: expect.any(String),
            cpf: "14963598108",
            id: "idPatient001",
            name: "Alexandre Anderson Geraldo Figueiredo",
            rg: "184133580",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            cpf: "75766888902",
            id: "idPatient002",
            name: "Vanessa Benedita Rayssa Mendes",
            rg: "256521098",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            cpf: "98488159889",
            id: "idPatient003",
            name: "Cecília Rosa Carla Almada",
            rg: "339141980",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            cpf: "",
            id: "idPatient004",
            name: "Emilly Gabrielly da Conceição",
            rg: "134167879",
            updatedAt: expect.any(String)
        },
        {
            createdAt: expect.any(String),
            cpf: "66377985762",
            id: "idPatient005",
            name: "César Kaique Fábio da Rosa",
            rg: "405072922",
            updatedAt: expect.any(String)
        }
    ]
    
    test("Buscando todos os pacientes", async () => {
        
        const output = await patientBusiness.getPatients()
        
        expect(output).toEqual(
            patientMockForm
        )
    })
})