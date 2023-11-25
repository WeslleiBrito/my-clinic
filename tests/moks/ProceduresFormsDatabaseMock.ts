import {ProceduresFormsDB} from '../../src/types/types'
import {BaseDatabase} from '../../src/database/BaseDatabase'

const ProceduresMock: ProceduresFormsDB[] = [
    {
        id: "procedure001",
        id_exam: "idExam002",
        id_form: "idForm003",
        name_exam: "Espirometria",
        price: 15
    },
    {
        id: "procedure002",
        id_exam: "idExam001",
        id_form: "idForm002",
        name_exam: "Glicose",
        price: 0
    },
    {
        id: "procedure003",
        id_exam: "idExam003",
        id_form: "idForm001",
        name_exam: "Avaliação clínica",
        price: 0
    },
    {
        id: "procedure004",
        id_exam: "idExam001",
        id_form: "idForm001",
        name_exam: "Glicose",
        price: 0
    },
    {
        id: "procedure005",
        id_exam: "idExam002",
        id_form: "idForm001",
        name_exam: "Espirometria",
        price: 0
    }
]

export class ProceduresFormsDatabaseMock extends BaseDatabase {

    public static TABLE_PROCEDURES_FORMS = "procedures_forms"

    public findProceduresFormsBy = async (collumn: "id" | "id_form", values: string[]): Promise<ProceduresFormsDB[]> => {
        
        const result: ProceduresFormsDB[] = []

        values.forEach((value) => {
            const search = ProceduresMock.find((procedure) => procedure[collumn] === value)

            if(search){

                result.push({
                    id: search.id,
                    id_exam: search.id_exam,
                    id_form: search.id_form,
                    name_exam: search.name_exam,
                    price: search.price
                })
            }
        })

        return result
    }

    public findAllProceduresForms = async (): Promise<ProceduresFormsDB[]> => {

        return ProceduresMock
    }

    public createProceduresForms = async (input: ProceduresFormsDB[]): Promise<void> => {}

    public editProceduresForms = async (input: ProceduresFormsDB): Promise<void> => {}

    public deleteProceduresForms  = async (idForm: string, idExams: string[]): Promise<void> => {}
}