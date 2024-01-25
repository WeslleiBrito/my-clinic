import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { ExamsDatabase } from "../database/ExamsDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { OccupationalRiskFormsDatabase } from "../database/OccupationalRisckFormDatabase";
import { OccupationalRiskDatabase } from "../database/OccupationalRiskDatabase";
import { PatientDatabase } from "../database/PatientsDatabase";
import { TypeExamAsoDatabase } from "../database/TypeExamAsoDatabase";
import { ProceduresFormsDatabase } from '../database/proceduresFormsDatabase';
import { InputCreateFormDTO, OutputCreateFormDTO } from '../dtos/Form/InputCreateForm.dto'
import { InputDeleteFormDTO, OutputDeleteFormDTO } from '../dtos/Form/InputDeleteForm.dto'
import { InputEditFormDTO, OutputEditFormDTO } from '../dtos/Form/InputEditForm.dto'
import { NotFoundError } from "../errors/NotFoundError";
import { Form } from "../models/Form";
import { IdGenerator } from "../services/IdGenerator";
import { ACCTIONS_EDIT_EXAM, CompanyDB, ExamsDB, ModelForm, OccupationalRiskFormsDB, OccupationalRisksDB, PatientDB, ProceduresFormsDB } from "../types/types";


export class FormBusiness {

    constructor(
        private formDatabase: FormDatabase,
        private examDatabase: ExamsDatabase,
        private companyDatabase: CompaniesDatabase,
        private patientDatabase: PatientDatabase,
        private proceduresFormsDatabase: ProceduresFormsDatabase,
        private idGenerator: IdGenerator,
        private occupationalRiskDatabase: OccupationalRiskDatabase,
        private occupationalRiskFormDatabase: OccupationalRiskFormsDatabase,
        private typeExameAsoDatabase: TypeExamAsoDatabase

    ){}


    public createForm = async (input: InputCreateFormDTO): Promise<OutputCreateFormDTO> => {

        const {idCompany, idExams, idPatient, idOccupationalHazards, idTypeExamAso, status, functionPatient, comments} = input

        const examExistAll = await this.examDatabase.findExamBy('id', idExams.map((exam) => exam.id))

        if(examExistAll.length !== idExams.length){

            throw new NotFoundError(idExams.length - examExistAll.length === 1 ? 'Existe um exame com id inválido.' : 'Existem mais de um exame com id inválido.')
        }

        const occupationalHazardsAll = await this.occupationalRiskDatabase.findOccupationalRiskBy('id', idOccupationalHazards.map((occupationalHazards) => occupationalHazards.id))

        if(occupationalHazardsAll.length !== idOccupationalHazards.length){

            throw new NotFoundError(idOccupationalHazards.length - occupationalHazardsAll.length === 1 ? 'Existe um risco ocupacional com id inválido.' : 'Existem mais de um risco ocupacional com id inválido.')
        }

        const companyExist = await this.companyDatabase.findCompanyBy('id', idCompany)

        if(!companyExist){
            throw new NotFoundError('A empresa informada não existe.')
        }

        const patientExist = await this.patientDatabase.findPatientBy('id', idPatient)

        if(!patientExist){
            throw new NotFoundError('O paciente informada não existe.')
        }

        const exams: {id: string, name: string, price: number, date: string, updatedAt: string}[] = examExistAll.map((exam) => {
            const searchDate = idExams.find((element) => element.id === exam.id) as {id: string, acction: boolean, date: Date}
            return {
                id: exam.id,
                name: exam.name,
                price: exam.price,
                date: searchDate.date.toISOString(),
                updatedAt: searchDate.date.toISOString()
                
            }
        })

        const occupationalRisks: {id: string, name: string}[] = occupationalHazardsAll.map((riskOccupational) => {
            return {
                id: riskOccupational.id,
                name: riskOccupational.name
            }
        })

        const [typeExamAsoExist] = await this.typeExameAsoDatabase.findTypeExamAsoBy('id', [idTypeExamAso])

        if(!typeExamAsoExist){
            throw new NotFoundError('O tipo do exame informada não existe.')
        }

        const id = this.idGenerator.generate()
        const date = new Date().toISOString()

        const newForm = new Form(
            {
                amount: exams.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0),
                cnpj: companyExist.cnpj,
                cpf: patientExist.cpf,
                createdAt: date,
                exams: exams,
                id: id,
                idCompany: idCompany,
                idPatient: idPatient,
                nameCompany: companyExist.name,
                namePatient: patientExist.name,
                numberProcedures: idExams.length,
                occupationalHazards: occupationalRisks,
                rg: patientExist.rg,
                updatedAt: date,
                typeExamAso: {
                    id: typeExamAsoExist.id,
                    name: typeExamAsoExist.name
                },
                status: status,
                functionPatient: functionPatient,
                comments: comments
            }
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
                updated_at: newForm.getUpdatedAt(),
                id_type_exam: newForm.getIdTypeExamAso().id,
                status_exam: newForm.getStatus() ? 1 : 0,
                function_patient: newForm.getFunctionPatient(),
                comments: newForm.getComments()
            }
        )
        
        const proceduresDB: ProceduresFormsDB[] = exams.map((exam) => {
            return {
                id: this.idGenerator.generate(),
                id_exam: exam.id,
                id_form: newForm.getId(),
                name_exam: exam.name,
                price: exam.price, 
                date: exam.date,
                updated_at: new Date().toISOString()
            }
        })

        const occupationalRiskDB: OccupationalRiskFormsDB[] = occupationalRisks.map((occupationalRisk) => {
            return {
                id: this.idGenerator.generate(),
                id_form: id,
                id_risk: occupationalRisk.id,
                name_risk: occupationalRisk.name
            }
        })

        await this.proceduresFormsDatabase.createProceduresForms(proceduresDB)
        await this.occupationalRiskFormDatabase.createOccupationalRiskForms(occupationalRiskDB)

        return{
            message: "Formulário criado com sucesso!"
        }
    }

    public editForm = async (input: InputEditFormDTO): Promise<OutputEditFormDTO> => {
        
        const {id, idCompany, idExams, idPatient, idOccupationalHazards, functionPatient, idTypeExamAso, status, comments} = input 

        let addProcedure: ProceduresFormsDB[] = []
        let editProcedure: ProceduresFormsDB[] = []
        let removeProcedure: ProceduresFormsDB[] = []
        const addOccupationalRisk: OccupationalRiskFormsDB[] = []
        const removeOccupationalRisk: OccupationalRiskFormsDB[] = []

        let add = 0
        let lower = 0

        const searchForm = await this.formDatabase.findFormBy('id', [id])

        if(searchForm.length < 1){
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

                const examSearch = idExamsExist.find((exam) => exam.id === item.id) as ExamsDB
                const searchDate = idExams.find((element) => element.id === item.id) as {id: string, acction: ACCTIONS_EDIT_EXAM, date: Date}
                if(item.acction === ACCTIONS_EDIT_EXAM.ADD || item.acction === ACCTIONS_EDIT_EXAM.add){

                    addProcedure.push(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch.name,
                            price: examSearch.price,
                            date: searchDate.date.toISOString(),
                            updated_at: new Date().toISOString()
                        }
                    )

                }else if(item.acction === ACCTIONS_EDIT_EXAM.REMOVE || item.acction === ACCTIONS_EDIT_EXAM.remove){

                    removeProcedure.push(
                        {
                            id: "",
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch.name,
                            price: examSearch.price,
                            date: searchDate.date.toISOString(),
                            updated_at: ""
                        }
                    )
                }else{
                    editProcedure.push(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch.name,
                            price: examSearch.price,
                            date: searchDate.date.toISOString(),
                            updated_at: new Date().toISOString()
                        }
                    )
                }
            })

            add = addProcedure.reduce((accumulator, currentPrice) => {return accumulator + currentPrice.price}, 0)
            lower = removeProcedure.reduce((accumulator, currentPrice) => {return accumulator + currentPrice.price}, 0)            
        }

        if(idOccupationalHazards){

            const idOccupationalHazardsExist = await this.occupationalRiskDatabase.findOccupationalRiskBy('id', idOccupationalHazards.map((occupational) => occupational.id))
    
            
            if(idOccupationalHazards.length !== idOccupationalHazardsExist.length){
                throw new NotFoundError(idOccupationalHazards.length - idOccupationalHazardsExist.length === 1 ? "Um dos ids informado não exite." : "Mais de um id não exite.")
            }

            idOccupationalHazards.forEach((item) => {

                const occupationalSearch = idOccupationalHazardsExist.find((occupational) => occupational.id === item.id) as OccupationalRisksDB
                
                if(item.acction){

                    addOccupationalRisk.push(
                        {
                            id: this.idGenerator.generate(),
                            id_form: id,
                            id_risk: occupationalSearch.id,
                            name_risk: occupationalSearch.name
                        }
                    )

                }else{

                    removeOccupationalRisk.push(
                        {
                            id: occupationalSearch.id,
                            id_form: id,
                            id_risk: occupationalSearch.id,
                            name_risk: occupationalSearch.name
                           
                        }
                    )
                }
             
                
            })         
        }

        if(idTypeExamAso){

            const [idTypeExamAsoExist] = await this.typeExameAsoDatabase.findTypeExamAsoBy('id', [idTypeExamAso])

            if(!idTypeExamAsoExist){
                throw new NotFoundError('O tipo do exame informado não existe.')
            }
        }

        const [formDatabase] = [...searchForm]
    
        const [typeExamAso] = await this.typeExameAsoDatabase.findTypeExamAsoBy('id', [formDatabase.id_type_exam])
        
        const newForm = new Form (
            {
                amount: formDatabase.amount,
                cnpj: formDatabase.cnpj,
                cpf: formDatabase.cpf,
                createdAt: formDatabase.created_at,
                exams: [],
                functionPatient: formDatabase.function_patient,
                id: id,
                idCompany: formDatabase.id_company,
                idPatient: formDatabase.id_patient,
                nameCompany: formDatabase.name_company,
                namePatient: formDatabase.name_patient,
                numberProcedures: formDatabase.number_procedures,
                occupationalHazards: [],
                rg: formDatabase.rg,
                status: formDatabase.status_exam ? true : false,
                typeExamAso: {
                    id: typeExamAso.id,
                    name: typeExamAso.name
                },
                updatedAt: formDatabase.updated_at
            }

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

        if(idTypeExamAso){
            const [typeExamAso] = await this.typeExameAsoDatabase.findTypeExamAsoBy('id', [idTypeExamAso])
            newForm.setIdTypeExamAso({id: typeExamAso.id, name: typeExamAso.name})
        }

        if(status){
            newForm.setStatus(status)
        }

        if(comments){
            newForm.setComments(comments)
        }

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
                updated_at: newForm.getUpdatedAt(),
                function_patient: functionPatient || newForm.getFunctionPatient(),
                id_type_exam: newForm.getIdTypeExamAso().id,
                status_exam: newForm.getStatus() ? 1 : 0,
                comments: newForm.getComments()
            }
        )

        if(addProcedure.length > 0){
            
            await this.proceduresFormsDatabase.createProceduresForms(addProcedure)
        }

        if(removeProcedure.length > 0){

            await this.proceduresFormsDatabase.deleteProceduresForms(id, removeProcedure.map((exam) => exam.id_exam))
        }
        
        if(editProcedure.length > 0){
            await this.proceduresFormsDatabase.editProceduresForms(editProcedure, id)
        }

        if(addOccupationalRisk.length > 0){
            
            await this.occupationalRiskFormDatabase.createOccupationalRiskForms(addOccupationalRisk)
        }

        if(removeOccupationalRisk.length > 0){

            await this.proceduresFormsDatabase.deleteProceduresForms(id, removeOccupationalRisk.map((occupational) => occupational.id_risk))
        }
        
        return {
            message: "Formulário atualizado com sucesso!"
        }
    }

    public getAllForms = async (): Promise<ModelForm[]> => {

        const forms = await this.formDatabase.findAllForm()
        const proceduresAll = await this.proceduresFormsDatabase.findAllProceduresForms()
        const occupationalRiskAll = await this.occupationalRiskFormDatabase.findAllOccupationalRiskForms()
        const formsModel: ModelForm[] = []

        for (const form of forms){
            const procedures: {id: string, name: string, price: number, date: string, updatedAt: string}[] = []
            const occupationalRisks: {id: string, name: string}[] = []

            proceduresAll.forEach((procedure) => {
                
                if(procedure.id_form === form.id){
                    
                    procedures.push({
                        id: procedure.id_exam,
                        name: procedure.name_exam,
                        price: procedure.price,
                        date: procedure.date,
                        updatedAt: procedure.updated_at
                    })
                }
            })

            occupationalRiskAll.forEach((occupational) => {
                
                if(occupational.id_form === form.id){
                    
                    occupationalRisks.push({
                        id: occupational.id_risk,
                        name: occupational.name_risk
                    })
                }
            })
                
            const [typeExamAso] = await this.typeExameAsoDatabase.findTypeExamAsoBy('id', [form.id_type_exam]) 
                
            const newForm = new Form (
                {
                    id: form.id,
                    namePatient: form.name_patient,
                    nameCompany: form.name_company,
                    idPatient: form.id_patient,
                    idCompany: form.id_company,
                    rg: form.rg,
                    cpf: form.cpf ? form.cpf : '',
                    cnpj: form.cnpj ? form.cnpj : '',
                    numberProcedures: form.number_procedures,
                    functionPatient: form.function_patient,
                    typeExamAso: {
                        id: typeExamAso.id,
                        name: typeExamAso.name
                    },
                    status: form.status_exam ? true : false,
                    createdAt: form.created_at,
                    updatedAt: form.updated_at,
                    amount: form.amount,
                    exams: procedures,
                    occupationalHazards: occupationalRisks,
                    comments: form.comments
                }
            )

            formsModel.push(newForm.getAllFormModel())
        }
        

        return formsModel
    }

    public deleteForm = async (input: InputDeleteFormDTO): Promise<OutputDeleteFormDTO> => {

        const formExist = await this.formDatabase.findFormBy('id', input.idForms)
   

        if(formExist.length !== input.idForms.length){
           throw new NotFoundError("O formulário informado não exite, verifique o id.")
        }

        await this.formDatabase.deleteForm(input.idForms)

        return {
            message: "Formulário deletado com sucesso."
        }

    }
}