import { PatientDatabase } from "../database/PatientsDatabase";
import { InputEditPatientDTO, OutputEditPatientDTO } from "../dtos/patient/InputEditPatient";
import { InputPatientDTO, OutputPatientDTO } from "../dtos/patient/InputPatient.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { Patient, PatientModel } from "../models/Patient";
import { IdGenerator } from "../services/IdGenerator";
import { ValidateCPFCNPJ } from "../services/ValidateCPFCNPJ";


export class PatientBuisness {
    constructor(
        private patientsDatabase: PatientDatabase,
        private idGenerator: IdGenerator, 
        private validateCPF : ValidateCPFCNPJ
    ){}

    public createPatient = async (input: InputPatientDTO): Promise<OutputPatientDTO> => {

        const {rg, cpf, name} = input

        const rgExist = await this.patientsDatabase.findPatientBy('rg', rg.replace(/[^a-zA-Z0-9]/g, ''))

        if(rgExist){
            throw new ConflictError("O rg informado já existe.")
        }


        if(cpf){
            const cpfExist = await this.patientsDatabase.findPatientBy( 'cpf', cpf.replace(/[^a-zA-Z0-9]/g, ''))

            if(cpfExist){
                throw new ConflictError("O cpf informado já existe.")
            }

            const cpfValid = this.validateCPF.validate(cpf)

            if(!cpfValid){
                throw new BadRequestError('CPF inválido.')
            }

        }

        const id = this.idGenerator.generate()
        const newDate = new Date().toISOString()

        const newPatient = new Patient(
            id,
            name,
            rg.replace(/[^a-zA-Z0-9]/g, ''),
            cpf ? cpf.replace(/[^a-zA-Z0-9]/g, '') : cpf,
            newDate,
            newDate
        )

        await this.patientsDatabase.createPatient(
            {
                id: newPatient.getId(),
                created_at: newPatient.getCreatedAt(),
                updated_at: newPatient.getUpdatedAt(),
                name: newPatient.getName(),
                rg: newPatient.getRg(),
                cpf: newPatient.getCpf()
            }
        )
        
        return {
            message: "Paciente cadastrado com sucesso!"
        }
    }

    public editPatient = async (input: InputEditPatientDTO): Promise<OutputEditPatientDTO> => {

        const account = await this.patientsDatabase.findPatientBy("id", input.id)

        let newCpf = account?.cpf

        if(!account){
            throw new NotFoundError("A conta informada não existe.")
        }

        if(input.cpf){

            const cpfExist = await this.patientsDatabase.findPatientBy( 'cpf', input.cpf.replace(/[^a-zA-Z0-9]/g, ''))

            if(cpfExist && account.cpf !== input.cpf.replace(/[^a-zA-Z0-9]/g, '')){
                throw new ConflictError("O cpf informado já existe.")
            }

            const cpfValid = this.validateCPF.validate(input.cpf)

            if(!cpfValid){
                throw new BadRequestError('CPF inválido.')
            }

            newCpf = input.cpf.replace(/[^a-zA-Z0-9]/g, '')
            
        }

        if(input.rg){
            
            const rgExist = await this.patientsDatabase.findPatientBy( 'rg', input.rg.replace(/[^a-zA-Z0-9]/g, ''))

            if(rgExist && account.rg !== input.rg.replace(/[^a-zA-Z0-9]/g, '')){
                throw new ConflictError("O rg informado já existe.")
            }
        }


        const newPatient = new Patient(
            input.id,
            input.name || account.name,
            input.rg || account.rg,
            newCpf,
            account.created_at,
            new Date().toISOString()
        )

        await this.patientsDatabase.editPatient(
            {
                id: newPatient.getId(),
                created_at: newPatient.getCreatedAt(),
                updated_at: newPatient.getUpdatedAt(),
                name: newPatient.getName(),
                rg: newPatient.getRg(),
                cpf: newPatient.getCpf()
            }
        )

        return {
            message: "Atualização concluída com sucesso!"
        }
    }

    public getPatients = async (): Promise<PatientModel[]> => {

        const search = await this.patientsDatabase.findPatientAll()

        const result: PatientModel[] = search.map((patient) => {
            
            const value: PatientModel = {
                id: patient.id,
                name: patient.name,
                rg: patient.rg,
                cpf: patient.cpf ? patient.cpf : "",
                createdAt: patient.created_at,
                updatedAt: patient.updated_at

            }

            return value
        }) 

        return result

    }
}