
export class Patient {
    constructor(
        private id: string,
        private name: string,
        private rg: string,
        private cpf: string | undefined,
        private cretatedAt: string,
        private updatedAt: string,
    ){}

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getRg = (): string => {
        return this.rg
    }

    public getCpf = (): string | undefined => {
        return this.cpf
    }

    public getCreatedAt = (): string => {
        return this.cretatedAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setRg = (newRg: string): void => {
        this.rg = newRg
    }

    public setCpf = (newCpf: string): void => {
        this.cpf = newCpf
    }

    public setUpdatedAt = (newUpdatedAt: string): void => {
        this.updatedAt = newUpdatedAt
    }
}

export interface PatientModel {
    id: string,
    name: string,
    rg: string,
    cpf: string | undefined,
    createdAt: string,
    updatedAt: string
}