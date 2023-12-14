import { ModelForm } from "../types/types"

export class Form {

    constructor(
        private input: {
            id: string,
            idCompany: string,
            idPatient: string,
            nameCompany: string,
            namePatient: string,
            rg: string,
            cnpj: string | undefined,
            cpf: string | undefined,
            functionPatient: string,
            numberProcedures: number,
            typeExamAso: {
                id: string,
                name: string
            },
            status: boolean,
            amount: number,
            createdAt: string,
            updatedAt: string,
            exams: {
                id: string,
                name: string,
                price: number
            }[],
            occupationalHazards: {
                id: string,
                name: string
            }[]
        }
    ) { }


    public getId = (): string => {
        return this.input.id
    }

    public getIdCompany = (): string => {
        return this.input.idCompany
    }

    public getIdPatient = (): string => {
        return this.input.idPatient
    }

    public getNameCompany = (): string => {
        return this.input.nameCompany
    }

    public getNamePatient = (): string => {
        return this.input.namePatient
    }

    public getRg = (): string => {
        return this.input.rg
    }

    public getCnpj = (): string | undefined => {
        return this.input.cnpj
    }

    public getFunctionPatient = (): string => {
        return this.input.functionPatient
    }

    public getIdTypeExamAso = (): {id: string, name: string} => {
        return this.input.typeExamAso
    }

    public getStatus = (): boolean => {
        return this.input.status
    }

    public getCpf = (): string | undefined => {
        return this.input.cpf
    }

    public getNumberProcedures = (): number => {
        return this.input.numberProcedures
    }

    public getAmount = (): number => {
        return this.input.amount
    }

    public getCreatedAt = (): string => {
        return this.input.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.input.updatedAt
    }

    public getExams = (): { id: string, name: string, price: number }[] => {
        return this.input.exams
    }

    public getOccupationalHazards = (): { id: string, name: string }[] => {
        return this.input.occupationalHazards
    }

    public getAllFormModel = (): ModelForm => {
        
        return {
            id: this.input.id,
            namePatient: this.input.namePatient,
            nameCompany: this.input.nameCompany,
            idPatient: this.input.idPatient,
            idCompany: this.input.idCompany,
            rg: this.input.rg,
            cpf: this.input.cpf,
            cnpj: this.input.cnpj,
            functionPatient: this.input.functionPatient,
            status: this.input.status,
            amount: this.input.amount,
            createdAt: this.input.createdAt,
            updatedAt: this.input.updatedAt,
            numberProcedures: this.input.numberProcedures,
            typeExamAso: this.input.typeExamAso,
            exams: this.input.exams,
            OccupationalHazards: this.input.occupationalHazards
        }
    }
    public setNumberProcedures = (newNumberProcedures: number): void => {
        this.input.numberProcedures = newNumberProcedures
    }

    public setIdCompany = (newIdCompany: string): void => {
        this.input.idCompany = newIdCompany
    }

    public setIdPatient = (newIdPatient: string): void => {
        this.input.idPatient = newIdPatient
    }

    public setNameCompany = (newNameCompany: string): void => {
        this.input.nameCompany = newNameCompany
    }

    public setNamePatient = (newNamePatient: string): void => {
        this.input.namePatient = newNamePatient
    }

    public setCnpj = (newCnpj: string | undefined): void => {
        this.input.cnpj = newCnpj
    }

    public setCpf = (newCpf: string | undefined): void => {
        this.input.cpf = newCpf
    }

    public setRg = (newRg: string): void => {
        this.input.rg = newRg
    }

    public setAmount = (newAmount: number): void => {
        this.input.amount = newAmount
    }

    public setUpdatedAt = (newDate: string): void => {
        this.input.updatedAt = newDate
    }

    public setIdTypeExamAso = (newIdTypeExamAso: {id: string, name: string}): void => {
        this.input.typeExamAso = newIdTypeExamAso
    }

    public setStatus = (newStatus: boolean): void => {
        this.input.status = newStatus
    }

    public setFunctionPatient = (newFunctionPatient: string): void => {
        this.input.functionPatient = newFunctionPatient
    }

}