import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { ExamsDatabase } from "../database/ExamsDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { PatientDatabase } from "../database/PatientsDatabase";
import { ProceduresFormsDatabase } from "../database/proceduresFormsDatabase";
import { InputCreateFormDTO, OutputCreateFormDTO } from "../dtos/Form/InputCreateForm.dto";
import { InputEditFormDTO, OutputEditFormDTO } from "../dtos/Form/InputEditForm.dto";
import { InputCreateExamDTO, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam.dto";
import { InputEditExamDTO, OutputEditExamDTO } from "../dtos/exam/InputEditExam.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Exam } from "../models/Exam";
import { Form } from "../models/Form";
import { IdGenerator } from "../services/IdGenerator";
import { ExamsDB, ProceduresFormsDB } from "../types/types";


export class FormBusiness {

    constructor(
        private formDatabase: FormDatabase,
        private examDatabase: ExamsDatabase,
        private companyDatabase: CompaniesDatabase,
        private patientDatabase: PatientDatabase,
        private proceduresFormsDatabase: ProceduresFormsDatabase,
        private idGenerator: IdGenerator
    ){}


    public createForm = async (input: InputCreateFormDTO): Promise<OutputCreateFormDTO> => {

        const {idCompany, idExams, idPatient} = input

        const examExistAll = await this.examDatabase.findExamBy('id', idExams.map((exam) => exam.id))

        if(examExistAll.length !== idExams.length){

            throw new NotFoundError(idExams.length - examExistAll.length === 1 ? 'Existe um exame com id inválido.' : 'Existe mais de um exame com id inválido.')
        }

        const companyExist = await this.companyDatabase.findCompanyBy('id', idCompany)

        if(!companyExist){
            throw new NotFoundError('A empresa informada não existe.')
        }

        const patientExist = await this.patientDatabase.findPatientBy('id', idPatient)

        if(!patientExist){
            throw new NotFoundError('O paciente informada não existe.')
        }

        const exams: {id: string, name: string, price: number}[] = examExistAll.map((exam) => {
            return {
                id: exam.id,
                name: exam.name,
                price: exam.price
            }
        })

        const id = this.idGenerator.generate()
        const date = new Date().toISOString()

        const newForm = new Form(
            id,
            idCompany,
            idPatient,
            companyExist.name,
            patientExist.name,
            companyExist.cnpj,
            patientExist.cpf,
            idExams.length,
            exams.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0),
            date,
            date,
            exams
        )
        
        
        await this.formDatabase.createForm(
            {
                amount: newForm.getAmount(),
                cnpj: newForm.getCnpj(),
                cpf: newForm.getCpf(),
                created_at: newForm.getCreatedAt(),
                id: newForm.getId(),
                id_company: newForm.getIdCompany(),
                id_patient: newForm.getIdPatient(),
                name_company: newForm.getNameCompany(),
                name_patient: newForm.getNamePatient(),
                number_procedures: newForm.getNumberProcedures(),
                updated_at: newForm.getUpdatedAt()
            }
        )

        return{
            message: "Formulário criado com sucesso!"
        }
    }

    public editForm = async (input: InputEditFormDTO): Promise<OutputEditFormDTO> => {
        
        const {id, idCompany, idExams, idPatient} = input 
        let addProcedure: ProceduresFormsDB[] = []
        let removeProcedure: string[] = []

        const form = await this.formDatabase.findFormBy('id', [id])

        if(form.length < 1){
            throw new NotFoundError('O formulário informado não existe.')
        }

        if(idCompany){
            const companyExist = await this.companyDatabase.findCompanyBy('id', idCompany)

            if(!companyExist){
                throw new NotFoundError('A empresa informado não existe.')
            }

        }

        if(idCompany){
            const companyExist = await this.formDatabase.findFormBy('id', [idCompany])

            if(!companyExist){
                throw new NotFoundError('O id da empresa informado não existe.')
            }

            if(companyExist.length > 0){
                if(companyExist[0].id !== id){
                    throw new ConflictError('O nome informado já existe.')
                }
            }
        }

        if(idPatient){
            const patientExist = await this.patientDatabase.findPatientBy('id', idPatient)

            if(!patientExist){
                throw new NotFoundError('O paciente informado não existe.')
            }
        }
        
        if(idExams){

            const idExamsExist = await this.examDatabase.findExamBy('id', idExams.map((exam) => exam.id))

            if(idExams.length > idExamsExist.length){
                throw new NotFoundError(idExams.length - idExamsExist.length === 1 ? "Um dos ids informado não exite." : "Mais de um id não exite.")
            }

            idExams.forEach((item) => {

                const examSearch = idExamsExist.find((exam) => exam.id === item.id)

                if(item.acction){

                    addProcedure.includes(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch ? examSearch.name : "",
                            price: examSearch ? examSearch.price : 0
                        }
                    )

                }else{

                    removeProcedure.includes(item.id)
                }
            })  
        }

        const procedures = await this.proceduresFormsDatabase.findProceduresFormsBy('id_form', [id])

        const newForm = new Form(
            id,
            form[0].id_company,
            form[0].id_patient,
            form[0].name_company,
            form[0].name_patient,
            form[0].cnpj ? form[0].cnpj : "",
            form[0].cpf ? form[0].cpf : "",
            form[0].number_procedures,
            form[0].amount,
            form[0].created_at,
            form[0].updated_at,            
            procedures.map((procedure) => {
                return {
                    id: procedure.id,
                    name: procedure.name_exam,
                    price: procedure.price
                }
            })
        )
        
        
        return {
            message: "Exame atualizado com sucesso!"
        }
    }


    public getAllExam = async () => {

        const search = await this.formDatabase.findExamAll()

        const result = search.map((exam) => {

            return {
                id: exam.id,
                name: exam.name,
                price: exam.price,
                createdAt: exam.created_at,
                updatedAt: exam.updated_at
            }
        })

        return result
    } 
}