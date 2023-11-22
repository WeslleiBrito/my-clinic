import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { ExamsDatabase } from "../database/ExamsDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { PatientDatabase } from "../database/PatientsDatabase";
import { InputCreateFormDTO, OutputCreateFormDTO } from "../dtos/Form/InputCreateForm.dto";
import { InputEditFormDTO, OutputEditFormDTO } from "../dtos/Form/InputEditForm.dto";
import { InputCreateExamDTO, OutputCreateExamDTO } from "../dtos/exam/InputCreateExam.dto";
import { InputEditExamDTO, OutputEditExamDTO } from "../dtos/exam/InputEditExam.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Exam } from "../models/Exam";
import { Form } from "../models/Form";
import { IdGenerator } from "../services/IdGenerator";
import { ExamsDB } from "../types/types";


export class FormBusiness {

    constructor(
        private formDatabase: FormDatabase,
        private examDatabase: ExamsDatabase,
        private companyDatabase: CompaniesDatabase,
        private patientDatabase: PatientDatabase,
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

        const form = await this.formDatabase.findFormBy('id', [id])

        if(form.length < 1){
            throw new NotFoundError('O formulário informado não existe.')
        }

        // criar a busca unificada dos procedimentos em relação ao id do formulário.
        
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


        const newExam = new Exam(
            id,
            name || exam[0].name,
            typeof price !== "undefined" ? price : exam[0].price,
            exam[0].created_at,
            new Date().toISOString()
        )

        await this.formDatabase.editExam({
            created_at: newExam.getCreatedAt(),
            id: newExam.getId(),
            name: newExam.getName(),
            price: newExam.getPrice(),
            updated_at: newExam.getUpdatedAt()
        })

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