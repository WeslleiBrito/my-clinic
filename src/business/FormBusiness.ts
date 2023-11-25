import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { ExamsDatabase } from "../database/ExamsDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { PatientDatabase } from "../database/PatientsDatabase";
import { ProceduresFormsDatabase } from '../database/proceduresFormsDatabase';
import { InputCreateFormDTO, OutputCreateFormDTO } from '../../src/dtos/form/InputCreateForm.dto'
import { InputEditFormDTO, OutputEditFormDTO } from '../../src/dtos/form/InputEditForm.dto'
import { NotFoundError } from "../errors/NotFoundError";
import { Form } from "../models/Form";
import { IdGenerator } from "../services/IdGenerator";
import { CompanyDB, ModelForm, PatientDB, ProceduresFormsDB } from "../types/types";


export class FormBusiness {

    constructor(
        private formDatabase: FormDatabase,
        private examDatabase: ExamsDatabase,
        private companyDatabase: CompaniesDatabase,
        private patientDatabase: PatientDatabase,
        private proceduresFormsDatabase: ProceduresFormsDatabase,
        private idGenerator: IdGenerator,
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

        const exams: {id: string, name: string, price: number, idExame: string, idForm: string}[] = examExistAll.map((exam) => {
            return {
                id: exam.id,
                idExame: "",
                idForm: "",
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
            patientExist.rg,
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
                rg: newForm.getRg(),
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
        
        const proceduresDB: ProceduresFormsDB[] = exams.map((exam) => {
            return {
                id: this.idGenerator.generate(),
                id_exam: exam.id,
                id_form: newForm.getId(),
                name_exam: exam.name,
                price: exam.price
            }
        })

        await this.proceduresFormsDatabase.createProceduresForms(proceduresDB)

        return{
            message: "Formulário criado com sucesso!"
        }
    }

    public editForm = async (input: InputEditFormDTO): Promise<OutputEditFormDTO> => {
        
        const {id, idCompany, idExams, idPatient} = input 

        let addProcedure: ProceduresFormsDB[] = []
        let removeProcedure: ProceduresFormsDB[] = []
        let add = 0
        let lower = 0

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

        if(idPatient){
            const patientExist = await this.patientDatabase.findPatientBy('id', idPatient)

            if(!patientExist){
                throw new NotFoundError('O paciente informado não existe.')
            }
        }
        
        if(idExams){

            const idExamsExist = await this.examDatabase.findExamBy('id', idExams.map((exam) => exam.id))
    
            
            if(idExams.length !== idExamsExist.length){
                throw new NotFoundError(idExams.length - idExamsExist.length === 1 ? "Um dos ids informado não exite." : "Mais de um id não exite.")
            }

            idExams.forEach((item) => {

                const examSearch = idExamsExist.find((exam) => exam.id === item.id)

                if(item.acction){

                    addProcedure.push(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch ? examSearch.name : "",
                            price: examSearch ? examSearch.price : 0
                        }
                    )

                }else{

                    removeProcedure.push(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch ? examSearch.name : "",
                            price: examSearch ? examSearch.price : 0
                        }
                    )
                }
            })

            add = addProcedure.reduce((accumulator, currentPrice) => {return accumulator + currentPrice.price}, 0)
            lower = removeProcedure.reduce((accumulator, currentPrice) => {return accumulator + currentPrice.price}, 0)            
        }

        const procedures = await this.proceduresFormsDatabase.findProceduresFormsBy('id_form', [id])

        const newForm = new Form (
            id,
            form[0].id_company,
            form[0].id_patient,
            form[0].name_company,
            form[0].name_patient,
            form[0].rg,
            form[0].cnpj,
            form[0].cpf,
            form[0].number_procedures,
            form[0].amount,
            form[0].created_at,
            form[0].updated_at,            
            procedures.map((procedure) => {
                return {
                    id: procedure.id,
                    idExame: procedure.id_exam,
                    idForm: procedure.id_form,
                    name: procedure.name_exam,
                    price: procedure.price
                }
            })
        )

        if(idCompany){

            const company = await this.companyDatabase.findCompanyBy('id', idCompany) as CompanyDB

            newForm.setIdCompany(idCompany)
            newForm.setNameCompany(company.name)
            newForm.setCnpj(company.cnpj)
        }

        if(idPatient){

            const patient = await this.patientDatabase.findPatientBy('id', idPatient) as PatientDB

            newForm.setIdPatient(idPatient)
            newForm.setNamePatient(patient.name)
            newForm.setCpf(patient.cpf)
            newForm.setRg(patient.rg)
        }

        newForm.setAmount(newForm.getAmount() - lower + add)
        newForm.setNumberProcedures(newForm.getNumberProcedures() - removeProcedure.length + addProcedure.length)
        newForm.setUpdatedAt(new Date().toISOString())

        await this.formDatabase.editForm(
            {
                amount: newForm.getAmount(),
                rg: newForm.getRg(),
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

        if(addProcedure.length > 0){
            
            await this.proceduresFormsDatabase.createProceduresForms(addProcedure)
        }

        if(removeProcedure.length > 0){

            await this.proceduresFormsDatabase.deleteProceduresForms(id, removeProcedure.map((exam) => exam.id_exam))
        }
        
        return {
            message: "Formulário atualizado com sucesso!"
        }
    }


    public getAllForms = async (): Promise<ModelForm[]> => {

        const forms = await this.formDatabase.findAllForm()
        const proceduresAll = await this.proceduresFormsDatabase.findAllProceduresForms()

        const formsModel: ModelForm[] = forms.map((form) => {

            const procedures: {id: string, name: string, price: number, idExame: string, idForm: string}[] = []

            proceduresAll.forEach((procedure) => {
                
                if(procedure.id_form === form.id){
                    
                    procedures.push({
                        id: procedure.id,
                        idExame: procedure.id_exam,
                        idForm: procedure.id_form,
                        name: procedure.name_exam,
                        price: procedure.price
                    })
                }
            })

            const newForm = new Form (
                form.id,
                form.id_company,
                form.id_patient,
                form.name_company,
                form.name_patient,
                form.rg,
                form.cnpj,
                form.cpf,
                form.number_procedures,
                form.amount,
                form.created_at,
                form.updated_at,
                procedures
            )
            
            return {
                id: newForm.getId(),
                idCompany: newForm.getIdCompany(),
                idPatient: newForm.getIdPatient(),
                nameCompany: newForm.getNameCompany(),
                namePatient: newForm.getNamePatient(),
                rg: newForm.getRg(),
                cnpj: newForm.getCnpj() ? newForm.getCnpj() : "",
                cpf: newForm.getCpf() ? newForm.getCpf() : "",
                numberProcedures: newForm.getNumberProcedures(),
                amount: newForm.getAmount(),
                createdAt: newForm.getCreatedAt(),
                updatedAt: newForm.getUpdatedAt(),
                exams: newForm.getExams()
            }
        })  

        return formsModel
    } 
}