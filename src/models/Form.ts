export class Form {

    constructor(
        private id: string,
        private idCompany: string,
        private idPatient: string,
        private nameCompany: string,
        private namePatient: string,
        private cnpj: string | undefined,
        private cpf: string | undefined,
        private numberProcedures: number,
        private amount: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    
    public getId = (): string => {
        return this.id
    }

    public getIdCompany = (): string => {
        return this.idCompany
    }

    public getIdPatient = (): string => {
        return this.idPatient
    }

    public getNameCompany = (): string => {
        return this.nameCompany
    }

    public getNamePatient = (): string => {
        return this.namePatient
    }

    public getCnpj = (): string | undefined => {
        return this.cnpj
    }

    public getCpf = (): string | undefined => {
        return this.cpf
    }
    
    public getNumberProcedures = (): number => {
        return this.numberProcedures
    }

    public getAmount = (): number => {
        return this.amount
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

    public setNumberProcedures = (newNumberProcedures: number): void => {
        this.numberProcedures = newNumberProcedures
    }

    public setAmount = (newAmount: number): void => {
        this.amount = newAmount
    }

    public setUpdatedAt = (newDate: string): void => {
        this.updatedAt = newDate
    }
    
}