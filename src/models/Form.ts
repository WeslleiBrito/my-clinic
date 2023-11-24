export class Form {

    constructor(
        private id: string,
        private idCompany: string,
        private idPatient: string,
        private nameCompany: string,
        private namePatient: string,
        private rg: string,
        private cnpj: string | undefined,
        private cpf: string | undefined,
        private numberProcedures: number,
        private amount: number,
        private createdAt: string,
        private updatedAt: string,
        private exams: {
            id: string,
            idExame: string,
            idForm: string,
            name: string,
            price: number
        }[]
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

    public getRg = (): string => {
        return this.rg
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

    public getExams = (): {id: string, name: string, price: number, idExame: string, idForm: string}[] => {
        return this.exams
    }


    public setNumberProcedures = (newNumberProcedures: number): void => {
        this.numberProcedures = newNumberProcedures
    }

    public setIdCompany = (newIdCompany: string): void => {
        this.idCompany = newIdCompany
    }

    public setIdPatient = (newIdPatient: string): void => {
        this.idPatient = newIdPatient
    }

    public setNameCompany = (newNameCompany: string): void => {
        this.nameCompany = newNameCompany
    }

    public setNamePatient = (newNamePatient: string): void => {
        this.namePatient = newNamePatient
    }

    public setCnpj = (newCnpj: string | undefined): void => {
        this.cnpj = newCnpj
    }

    public setCpf = (newCpf: string | undefined): void => {
        this.cpf = newCpf
    }

    public setRg = (newRg: string ): void => {
        this.rg = newRg
    }

    public setAmount = (newAmount: number): void => {
        this.amount = newAmount
    }

    public setUpdatedAt = (newDate: string): void => {
        this.updatedAt = newDate
    }
    
}