import { CompaniesDatabase } from "../database/CompaniesDatabase";
import { ExamsDatabase } from "../database/ExamsDatabase";
import { FormDatabase } from "../database/FormDatabase";
import { OccupationalRiskFormsDatabase } from "../database/OccupationalRisckFormDatabase";
import { OccupationalRiskDatabase } from "../database/OccupationalRiskDatabase";
import { PatientDatabase } from "../database/PatientsDatabase";
import { TypeExamAsoDatabase } from "../database/TypeExamAsoDatabase";
import { ProceduresFormsDatabase } from '../database/proceduresFormsDatabase';
import { InputCreateFormDTO, OutputCreateFormDTO } from '../dtos/Form/InputCreateForm.dto'
import { InputDeleteFormDTO, OutputDeleteFormDTO } from "../dtos/Form/InputDeleteForm.dto";
import { InputEditFormDTO, OutputEditFormDTO } from '../dtos/Form/InputEditForm.dto'
import { NotFoundError } from "../errors/NotFoundError";
import { Form } from "../models/Form";
import { IdGenerator } from "../services/IdGenerator";
import { CompanyDB, ExamsDB, ModelForm, OccupationalRiskFormsDB, OccupationalRisksDB, PatientDB, ProceduresFormsDB } from "../types/types";


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

        const {idCompany, idExams, idPatient, idOccupationalHazards, idTypeExamAso, status} = input

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

        const exams: {id: string, name: string, price: number, idExame: string, idForm: string}[] = examExistAll.map((exam) => {
            return {
                id: exam.id,
                idExame: "",
                idForm: "",
                name: exam.name,
                price: exam.price
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
                idTypeExamAso: typeExamAsoExist.id,
                status: status
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
                id_type_exam: newForm.getIdTypeExamAso(),
                status_exam: newForm.getStatus() ? 1 : 0
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
        
        const {id, idCompany, idExams, idPatient, idOccupationalHazards} = input 

        let addProcedure: ProceduresFormsDB[] = []
        let removeProcedure: ProceduresFormsDB[] = []
        const addOccupationalRisk: OccupationalRiskFormsDB[] = []
        const removeOccupationalRisk: OccupationalRiskFormsDB[] = []

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

                const examSearch = idExamsExist.find((exam) => exam.id === item.id) as ExamsDB

                if(item.acction){

                    addProcedure.push(
                        {
                            id: this.idGenerator.generate(),
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch.name,
                            price: examSearch.price
                        }
                    )

                }else{

                    removeProcedure.push(
                        {
                            id: "",
                            id_exam: item.id,
                            id_form: id,
                            name_exam: examSearch.name,
                            price: examSearch.price
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
            [],
            []
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

        const formsModel: ModelForm[] = forms.map((form) => {

            const procedures: {id: string, name: string, price: number}[] = []
            const occupationalRisks: {id: string, name: string}[] = []

            proceduresAll.forEach((procedure) => {
                
                if(procedure.id_form === form.id){
                    
                    procedures.push({
                        id: procedure.id_exam,
                        name: procedure.name_exam,
                        price: procedure.price
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
                procedures,
                occupationalRisks
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
                exams: newForm.getExams(),
                OccupationalHazards: newForm.getOccupationalHazards()
            }
        })  

        return formsModel
    }

    public deleteForm = async (input: InputDeleteFormDTO): Promise<OutputDeleteFormDTO> => {

        const formExist = await this.formDatabase.findFormBy('id', [input.id])
   

        if(formExist.length === 0){
           throw new NotFoundError("O formulário informado não exite, verifique o id.")
        }

        await this.formDatabase.deleteForm(input.id)

        return {
            message: "Formulário deletado com sucesso."
        }

    }
}