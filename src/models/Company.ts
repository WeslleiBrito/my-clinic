

export class Company {

    constructor(
        private id: string,
        private name: string,
        private cnpj: string | undefined,
        private createdAt: string,
        private updatedAt: string
    ){}
    
    public getId = (): string => {
        return this.id
    }   

    public getName = (): string => {
        return this.name
    }

    public getCnpj = (): string | undefined => {
        return this.cnpj
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }
}